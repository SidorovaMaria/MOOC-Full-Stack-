```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user submits a new note through the input

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created application/json
    deactivate server

    Note right of browser: The browser updates the interface without reloading the page

```
