```mermaid
sequenceDiagram
    participant server
    participant browser
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: JavaScrit file document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [
    {
        "content": "",
        "date": "2024-12-21T04:53:45.772Z"
    },
    {
        "content": "Test again",
        "date": "2024-12-21T04:53:57.376Z"
    },
    ,... ]
    deactivate server

```
