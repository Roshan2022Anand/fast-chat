package socket

import (
	"fmt"
	"sync"
)

type Hub struct {
	register   chan *Client
	unregister chan *Client
	clients    map[*Client]bool
	mu         sync.Mutex
}

// to create a new hub
func NewHub() *Hub {
	return &Hub{
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    map[*Client]bool{},
	}
}

// to register the client
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			fmt.Println("client registered", client.conn.RemoteAddr())
			h.mu.Unlock()
		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
			fmt.Println("client unregistered", client.conn.RemoteAddr())
			h.mu.Unlock()
		}
	}
}
