import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()}
        <span>Localio. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;