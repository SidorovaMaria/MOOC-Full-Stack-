```mermaid
sequenceDiagram
    participant server
    participant broswer
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTML document
    deactivate server



```