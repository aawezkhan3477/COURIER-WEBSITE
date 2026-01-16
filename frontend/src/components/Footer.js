export default function Footer() {
  return (
    <>
      <style>
        {`
          .footer {
            background: #0f2027;
            color: #ccc;
            text-align: center;
            padding: 15px;
            font-size: 0.85rem;
          }

          .footer span {
            color: #00c6ff;
          }
        `}
      </style>

      <footer className="footer">
        © {new Date().getFullYear()} <span>Courier Service</span>. All rights reserved.
      </footer>
    </>
  );
}
