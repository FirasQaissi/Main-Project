import React from "react";

const AboutWeb: React.FC = () => (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 24 }}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md ">
        <h1>About Our Website</h1>
        <p>
            Welcome to our Data Project! This platform is designed to help you easily manage business cards and streamline your professional connections.
        </p>
        <ul>
            <li>
                <strong>Register & Sign In:</strong> Create your personal account to securely access all features.
            </li>
            <li>
                <strong>Business Card Creation:</strong> Effortlessly design and manage your own business cards with your personal or company information.
            </li>
            <li>
                <strong>Data Management:</strong> Organize, update, and keep track of all your cards in one convenient place.
            </li>
            <li>
                <strong>More Features:</strong> Enjoy a growing set of tools to help you connect and manage your business presence online.
            </li>
        </ul>
        <p>
            We are committed to providing a user-friendly and secure experience. Thank you for choosing our website to manage your business cards and professional information!
        </p>
    </div>
);

export default AboutWeb;