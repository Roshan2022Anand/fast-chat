package socket

import (
	"encoding/json"
	"fmt"
)

// to send the event to the client
func sendEv(c *Client, ev *WsEvent) {
	rDataByte, err := json.Marshal(*ev)
	if err != nil {
		fmt.Println("err while marshaling event data:", err)
		return
	}

	c.send <- rDataByte
}