package socket

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
)

var Clients = make(map[string]*Client)

type Client struct {
	hub   *Hub
	conn  *websocket.Conn
	send  chan []byte
	email string
}

type WsEvent struct {
	Event string            `json:"event"`
	Data  map[string]string `json:"data"`
}

// to read the msg from the client
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	// c.conn.SetReadDeadline(time.Now().Add(pongWait))
	// c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		//reading the msg from client
		_, msg, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		//convert to map
		var ev WsEvent
		if err := json.Unmarshal(msg, &ev); err != nil {
			log.Println("err while unmarshaling event:", err)
			continue
		}

		switch ev.Event {
		case "user":
			email := ev.Data["email"]
			c.email = email
			Clients[email] = c
		case "msg:sent":
			c.hub.sendMsg(c, &ev)
		case "online":
			c.hub.getOnlineUsers(c)
		}
	}
}

// to write the msg to the client
func (c *Client) writePump() {
	defer func() {
		c.conn.Close()
	}()

	for {
		select {
		case msg, ok := <-c.send:
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(msg)

			if err := w.Close(); err != nil {
				return
			}
		}
	}
}

// upgrader for upgrading http to ws
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// to upgrade the client http to ws
func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	go client.writePump()
	go client.readPump()
}
