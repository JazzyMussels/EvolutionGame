FROM ubuntu:latest

RUN apt update && apt install -y python
COPY . .

EXPOSE 8000
CMD ["python", "-m", "SimpleHTTPServer"]
