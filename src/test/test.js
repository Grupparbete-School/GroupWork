import React from "react";
export default function LoginPage() {
    
    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     //sends us to notion authorize page and then to localhost:5000/authorize
    //     window.open(
    //         `https://api.notion.com/v1/oauth/authorize?client_id=d6007b47-aec4-4eb8-b8ca-c12f3bbe8ee3&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauthorize`, '_blank', 'width=500,height=600'
    //     );
    // };
    return (
        <div>
            <a href="https://api.notion.com/v1/oauth/authorize?client_id=d6007b47-aec4-4eb8-b8ca-c12f3bbe8ee3&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauthorize">Add to Notion</a>
        </div>
    )
}