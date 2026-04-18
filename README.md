# StadiumSync ⚡

StadiumSync is a Progressive Web App (PWA) designed to eliminate bottlenecks, reduce blind wait times, and optimize crowd movement in large-scale sporting venues like Holkar Stadium.

## Features

- **Smart Routing Engine**: Dynamically routes fans to the shortest bathroom lines and least congested exit gates based on simulated live density data.
- **Just-In-Time Concessions**: Order food from your seat and get a precise pickup window based on real-time kitchen queues. No more missed plays.
- **Real-Time Synchronization**: Instantly pushes crowd data and emergency alerts from the Admin Dashboard to the User View.

## Architecture & Mock Data (Self-Contained Simulation)

To provide a zero-setup, fully functional demo for judges, this version of StadiumSync uses a **Self-Contained Simulation** instead of a live Supabase backend.

- **State Management**: The state is stored locally and syncs across browser tabs using the standard Web `BroadcastChannel` API.
- **Admin -> User Sync**: When you click "Spike" on the Admin Dashboard, it updates the state and broadcasts the change. The User View (if open in another tab/window on the same device) receives this event and instantly re-renders.
- **Mock Data**: Initial facility data, including crowd density percentages and wait times, are loaded from `src/lib/mockData.ts`.

*Note: For a production deployment, the `BroadcastChannel` logic in `src/lib/store.ts` would be replaced with Supabase Realtime WebSocket subscriptions.*

## How to Run Locally

### Prerequisites
You need Node.js installed on your machine.

### Installation

1. Clone or download this repository.
2. Open your terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser:
   - **Main Landing**: `http://localhost:3000`
   - **Admin Dashboard**: `http://localhost:3000/admin` (Open this on your desktop screen)
   - **User View**: `http://localhost:3000/user` (Open this in a separate window and resize it to mobile dimensions)

### Demo Flow

1. Open the **Admin Dashboard** and **User View** side-by-side.
2. In the Admin Dashboard, click the **"Spike"** button next to a Bathroom or Gate.
3. Watch the User View instantly update! The wait time will jump, the color will change to red, and the app will automatically "Recommend" a different facility.
4. Use the **Emergency Broadcast** section in the Admin Dashboard to type a message and push it to the User View.

## Deployment

This app is ready to be deployed to Vercel. Because it uses client-side state syncing for the demo, no backend credentials are required. Simply import the repository into Vercel and hit deploy!
