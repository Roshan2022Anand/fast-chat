package socket

import (
	"encoding/json"
	"fmt"
)

type WsEVres struct {
	Event string                 `json:"event"`
	Data  map[string]interface{} `json:"data"`
}

// to send the event to the client
func sendEv(c *Client, ev *WsEVres) {
	rDataByte, err := json.Marshal(*ev)
	if err != nil {
		fmt.Println("err while marshaling event data:", err)
		return
	}

	c.send <- rDataByte
}

// to send msg to given client
func (h *Hub) sendMsg(c *Client, ev *WsEvent) {
	from := c.email
	to := ev.Data["to"]
	msg := ev.Data["msg"]

	rData := &WsEVres{
		Event: "msg:received",
		Data: map[string]interface{}{
			"from": from,
			"msg":  msg,
		},
	}

	client := Clients[to]
	sendEv(client, rData)
}

// to get all online users
func (h *Hub) getOnlineUsers(c *Client) {
	rData := &WsEVres{
		Event: "isOnline",
		Data:  make(map[string]interface{}),
	}

	users := []string{}
	for email, client := range Clients {
		if client != c {
			users = append(users, email)
		}
	}
	rData.Data["users"] = users

	sendEv(c, rData)
}
