# Project Plan: FFC Transaction Website

## Goal
Develop a mobile-responsive and visually appealing website to streamline the FFC transaction process by integrating image uploads to ImgBB and redirecting to a KoboToolbox webform for data entry.

## Technologies
*   **Frontend:** HTML5, CSS3, JavaScript
*   **Styling:** Tailwind CSS, Google Fonts
*   **Image Hosting:** ImgBB API
*   **Form:** KoboToolbox Webform
*   **PWA:** Manifest, Service Worker

## Phases

### 1. Project Setup & UI Scaffolding
- **Objective:** Create the basic file structure and a simple, mobile-friendly user interface.
- **Tasks:
    - Create `index.html`, `style.css`, and `script.js`.
    - Set up Tailwind CSS and Google Fonts in the project.
    - Design a single-column, mobile-first layout in `index.html` with a visually appealing file uploader.

### 2. ImgBB Image Upload & Redirect
- **Objective:** Implement the functionality to automatically upload an image to ImgBB upon selection and redirect the user to the KoboToolbox form.
- **Tasks:
    - Write JavaScript to handle the file input's `change` event.
    - Use the `fetch` API to send the image data to the ImgBB API.
    - Upon successful upload, redirect the user to the KoboToolbox form with the image URL as a parameter.
    - Handle potential API errors and provide feedback to the user.

### 3. Styling and Finalization
- **Objective:** Apply styling to create a polished and user-friendly interface.
- **Tasks:
    - Use Tailwind CSS and custom styles to create a modern and visually appealing design.
    - Ensure the website is fully responsive and works well on all screen sizes.
    - Add clear instructions and user feedback messages.
    - Final testing of all functionalities.

### 4. PWA and Share Target
- **Objective:** Convert the web application into a Progressive Web App (PWA) and enable it to be a share target for images.
- **Tasks:
    - Create `manifest.json` to define the PWA's properties.
    - Create a service worker (`sw.js`) to enable offline functionality.
    - Link the manifest and register the service worker in `index.html`.
    - Add a 512x512 icon to `manifest.json` for better PWA compatibility.
    - Update the `start_url` in `manifest.json`.
    - Implement the `share_target` feature in `manifest.json` to allow the app to receive shared images.
    - Add `launchQueue` logic in `script.js` to process shared images and trigger the upload.

## Timeline
- **Phase 1:** 1 day
- **Phase 2:** 1 day
- **Phase 3:** 1 day
- **Phase 4:** 1 day
