const Sidebar = () => {
    const url = window.location.href.split("/")[3];

    return (
        <div className="sidebar">
            <div className="sidebar-logo"><ion-icon name="logo-web-component"></ion-icon></div>
            {url === "" ? <div className="sidebar-item active"><ion-icon name="home-outline"></ion-icon>&nbsp;Home</div> : <a href="/" className="sidebar-item"><ion-icon name="home-outline"></ion-icon></a>}
            {url === "weather" ? <div className="sidebar-item active"><ion-icon name="cloud-outline"></ion-icon>&nbsp;Weather</div> : <a href="/weather" className="sidebar-item"><ion-icon name="cloud-outline"></ion-icon></a>}
            {url === "travel" ? <div className="sidebar-item active"><ion-icon name="walk-outline"></ion-icon>&nbsp;Travel</div> : <a href="/travel" className="sidebar-item"><ion-icon name="walk-outline"></ion-icon></a>}
            {url === "news" ? <div className="sidebar-item active"><ion-icon name="newspaper-outline"></ion-icon>&nbsp;News</div> : <a href="/news" className="sidebar-item"><ion-icon name="newspaper-outline"></ion-icon></a>}
            {url === "about" ? <div className="sidebar-item active"><ion-icon name="information-circle-outline"></ion-icon>&nbsp;About</div> : <a href="/about" className="sidebar-item"><ion-icon name="information-circle-outline"></ion-icon></a>}
        </div>
    )
}

export default Sidebar