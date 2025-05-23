socket-server :
	clear \
	&& cd socket-service \
	&& go build -o server cmd/main.go \
	&& ./server \

client :
	@clear \
	&& cd frontend \
	&& pnpm dev