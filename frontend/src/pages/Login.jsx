import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .lb{min-height:100vh;display:flex;justify-content:center;align-items:center;background:linear-gradient(135deg,#c8d8e4 0%,#dce8f0 40%,#b8cdd8 100%);padding:24px;font-family:'DM Sans',sans-serif}
        .lc{width:100%;max-width:880px;background:#edf2f5;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,0.12);display:flex;overflow:hidden;min-height:500px}
        .ll{flex:0 0 44%;background:linear-gradient(160deg,#e4edf4 0%,#d0dfe8 100%);display:flex;align-items:center;justify-content:center;padding:40px 32px}
        .li{width:100%;max-width:280px}
        .lr{flex:1;padding:52px;display:flex;flex-direction:column;justify-content:center}
        .lw{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;color:#1a2533;margin-bottom:4px}
        .ls{font-size:13px;color:#7a8fa0;margin-bottom:32px}
        .lh{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;color:#8b6c52;margin-bottom:24px}
        .le{background:#fde8e8;color:#b91c1c;border-radius:10px;padding:10px 14px;font-size:13px;margin-bottom:16px}
        .lf{display:flex;flex-direction:column;gap:14px}
        .lfld{position:relative}
        .lin{width:100%;padding:14px 48px 14px 20px;border:none;border-radius:50px;background:#d8e5ed;color:#1a2533;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:background .2s}
        .lin::placeholder{color:#8fa5b4}
        .lin:focus{background:#c8d8e2}
        .lic{position:absolute;right:18px;top:50%;transform:translateY(-50%);color:#7a98a8;display:flex;align-items:center;pointer-events:none}
        .licc{pointer-events:auto;cursor:pointer}
        .lfg{text-align:right;font-size:12px;color:#5a7080;cursor:pointer;letter-spacing:.04em;text-transform:uppercase;font-weight:500}
        .lfg:hover{color:#1a2533}
        .lbtn{width:100%;padding:14px;border-radius:50px;border:none;background:#4a6d7c;color:#fff;font-size:15px;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:background .2s,transform .1s}
        .lbtn:hover{background:#3a5a6a;transform:translateY(-1px)}
        .lbtn:disabled{opacity:.7;cursor:not-allowed;transform:none}
        .ldiv{display:flex;align-items:center;gap:12px}
        .ldivl{flex:1;height:1px;background:#c5d4dc}
        .ldivt{font-size:11px;color:#8fa5b4;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
        .lgbtn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:11px;border-radius:50px;border:1.5px solid #c5d4dc;background:transparent;color:#4a6d7c;font-size:14px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background .2s}
        .lgbtn:hover{background:#e0eaf0}
        .lfoot{text-align:center;font-size:13.5px;color:#5a7080;font-weight:500}
        .lfoot a{color:#1a2533;font-weight:700;text-decoration:underline;text-underline-offset:2px}
        @media(max-width:640px){.ll{display:none}.lr{padding:36px 24px}}
      `}</style>

      <div className="lb">
        <div className="lc">
          <div className="ll">
            <svg className="li" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <ellipse cx="30" cy="40" rx="14" ry="28" fill="#c8d8a8" transform="rotate(-30 30 40)"/>
                <ellipse cx="55" cy="25" rx="10" ry="22" fill="#b8c898" transform="rotate(-10 55 25)"/>
                <ellipse cx="15" cy="65" rx="8" ry="18" fill="#d8e8b8" transform="rotate(-50 15 65)"/>
              </g>
              <g opacity="0.6">
                <ellipse cx="280" cy="35" rx="12" ry="24" fill="#e8a8a8" transform="rotate(20 280 35)"/>
                <ellipse cx="300" cy="60" rx="8" ry="18" fill="#d89898" transform="rotate(40 300 60)"/>
              </g>
              <g opacity="0.6">
                <ellipse cx="25" cy="200" rx="10" ry="20" fill="#e8a8a8" transform="rotate(15 25 200)"/>
                <ellipse cx="10" cy="225" rx="7" ry="14" fill="#d89898" transform="rotate(-10 10 225)"/>
              </g>
              <ellipse cx="160" cy="230" rx="145" ry="25" fill="#c8d8c8" opacity="0.35"/>
              <ellipse cx="85" cy="210" rx="40" ry="18" fill="#c8a870"/>
              <ellipse cx="175" cy="215" rx="45" ry="20" fill="#d4b880"/>
              <ellipse cx="255" cy="208" rx="38" ry="17" fill="#b89860"/>
              <g transform="translate(48,120)">
                <circle cx="30" cy="28" r="22" fill="#d4a8e0"/>
                <ellipse cx="30" cy="10" rx="22" ry="12" fill="#3a2820"/>
                <rect x="12" y="50" width="36" height="40" rx="10" fill="#9090d0"/>
                <path d="M12 88 Q0 100 10 110 Q20 118 30 108" fill="#9090d0"/>
                <path d="M48 88 Q60 100 50 110 Q40 118 30 108" fill="#9090d0"/>
                <path d="M48 65 Q70 60 80 70" stroke="#9090d0" strokeWidth="12" strokeLinecap="round" fill="none"/>
              </g>
              <g transform="translate(120,110)">
                <circle cx="30" cy="28" r="22" fill="#e8c090"/>
                <ellipse cx="30" cy="10" rx="22" ry="14" fill="#2a1810"/>
                <rect x="10" y="50" width="40" height="45" rx="10" fill="#a0c8d0"/>
                <path d="M10 93 Q-5 108 8 118 Q18 126 28 115" fill="#a0c8d0"/>
                <path d="M50 93 Q65 108 52 118 Q42 126 32 115" fill="#a0c8d0"/>
              </g>
              <g transform="translate(185,108)">
                <circle cx="30" cy="28" r="23" fill="#f0a878"/>
                <ellipse cx="30" cy="8" rx="23" ry="13" fill="#1a1210"/>
                <circle cx="30" cy="4" r="8" fill="#1a1210"/>
                <rect x="8" y="51" width="44" height="46" rx="10" fill="#d0b890"/>
                <path d="M8 95 Q-6 110 7 120 Q18 128 28 116" fill="#d0b890"/>
                <path d="M52 95 Q66 110 53 120 Q42 128 32 116" fill="#d0b890"/>
              </g>
              <g transform="translate(238,118)">
                <circle cx="30" cy="28" r="22" fill="#c8d4e8"/>
                <ellipse cx="30" cy="10" rx="22" ry="12" fill="#484060"/>
                <rect x="10" y="50" width="40" height="44" rx="10" fill="#8898c0"/>
                <path d="M10 92 Q-4 107 9 117 Q19 125 29 114" fill="#8898c0"/>
                <path d="M50 92 Q64 107 51 117 Q41 125 31 114" fill="#8898c0"/>
              </g>
            </svg>
          </div>

          <div className="lr">
            <h1 className="lw">Welcome Back !</h1>
            <p className="ls">Log in to make your voice heard in your community.</p>
            <div className="lh">Log-in</div>
            {error && <div className="le">{error}</div>}
            <div className="lf">
              <div className="lfld">
                <input className="lin" type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} required />
                <span className="lic"><MailIcon /></span>
              </div>
              <div className="lfld">
                <input className="lin" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <span className={`lic licc`} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </span>
              </div>
              <div className="lfg">Forgot Password ?</div>
              <button className="lbtn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Logging in..." : "Log-in"}
              </button>
              <div className="ldiv">
                <div className="ldivl" />
                <span className="ldivt">Alternative Login Method</span>
                <div className="ldivl" />
              </div>
              <button className="lgbtn"><GoogleIcon /> Google</button>
              <p className="lfoot">New to CIVIX? <Link to="/register">Create an Account</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
