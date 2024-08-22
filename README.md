# Mistral Chat RTL

A Chrome extension that enhances the Mistral Chat experience for right-to-left language users, including Persian and Arabic speakers, by adding right-to-left text support.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [Development](#development)
- [Testing](#testing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Features

- Automatically applies right-to-left (RTL) text direction to the chat interface.
- Supports multiple chat sessions with different IDs.
- Ensures that the extension's styles are applied to newly opened tabs.
- Easy to toggle on and off using the extension's popup menu.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/alimahdibahrami/mistral-chat-rtl.git
   ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory where you cloned the repository.
5. The extension should now be installed and active.

## Use in the form of development

1. Open the Mistral Chat website (https://chat.mistral.ai/chat).
2. The extension will automatically apply RTL styles to the chat interface.
3. You can toggle the extension on and off using the extension's popup menu.

## File Structure

```
mistral-chat-rtl/
├── images/
│   ├── icon16-inactive.png
│   ├── icon48-inactive.png
│   ├── icon128-inactive.png
│   ├── icon16-active.png
│   ├── icon48-active.png
│   ├── icon128-active.png
├── content.js
├── styles.css
├── popup.html
├── popup.js
├── background.js
├── manifest.json
├── README.md
└── LICENSE
```

- `manifest.json`: The manifest file that defines the extension's metadata and permissions.
- `content.js`: The content script that applies the RTL styles to the chat interface.
- `styles.css`: The CSS file that contains the RTL styles.
- `popup.html`: The HTML file for the extension's popup menu.
- `popup.js`: The JavaScript file that handles the popup menu's functionality.
- `background.js`: The background script that manages the extension's state and applies styles to new tabs.
- `images/`: Directory containing the extension's icons.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request.

## Development

### Prerequisites

- Node.js and npm (optional for development tools)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/alimahdibahrami/mistral-chat-rtl.git
   ```
2. Navigate to the project directory:
   ```sh
   cd mistral-chat-rtl
   ```
3. Install dependencies (if any):
   ```sh
   npm install
   ```

### Building

If you have any build tools or scripts, you can add them here.

## Testing

### Running the Extension in Developer Mode

1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode" by toggling the switch in the top right corner.
3. Click on "Load unpacked" and select the project directory.
4. The extension should now be installed and active.

### Testing the Extension

1. Open the Mistral Chat website (https://chat.mistral.ai/chat).
2. Verify that the RTL styles are applied correctly.
3. Toggle the extension on and off using the popup menu and ensure the styles are applied and removed as expected.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact alimahdibahrami2001@gmail.com.

## Acknowledgments

- Thanks to the Mistral Chat team for providing the chat service.
- Thanks to the open-source community for their contributions and support.