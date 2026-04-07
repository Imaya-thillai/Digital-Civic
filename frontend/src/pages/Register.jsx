import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default Leaflet marker icon
const DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

// *** MUST be outside Register component — React Compiler requirement ***
function LocationMarker({ setFormData, setMapCoords }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setMapCoords([lat, lng]);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.village || data.address.county || "Selected Location";
        setFormData((prev) => ({ ...prev, location: city }));
      } catch {
        setFormData((prev) => ({ ...prev, location: `${lat.toFixed(4)}, ${lng.toFixed(4)}` }));
      }
    },
  });
  return null;
}

// Icons
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
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
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
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

const Register = () => {
  const navigate = useNavigate();
  const { register, login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "", location: "" });
  const [mapCoords, setMapCoords] = useState([17.385, 78.4867]);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message;
      if (message === "User already exists") {
        try {
          await login({ email: formData.email, password: formData.password });
          navigate("/dashboard");
        } catch {
          setError("User exists, but password is incorrect");
        }
      } else {
        setError(message || "Registration Failed");
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .rb{min-height:100vh;display:flex;justify-content:center;align-items:center;background:linear-gradient(135deg,#c8d8e4 0%,#dce8f0 40%,#b8cdd8 100%);padding:24px;font-family:'DM Sans',sans-serif}
        .rc{width:100%;max-width:960px;background:#f0f4f7;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,0.12);display:flex;overflow:hidden;min-height:600px}
        .rl{flex:0 0 42%;background:linear-gradient(160deg,#e8eff4 0%,#d4e2ea 100%);display:flex;align-items:center;justify-content:center;padding:40px 32px}
        .rli{width:100%;max-width:260px}
        .rr{flex:1;padding:36px 44px;display:flex;flex-direction:column;justify-content:center;overflow-y:auto}
        .rh{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;color:#1a2533;margin-bottom:4px}
        .rs{font-size:13px;color:#7a8fa0;margin-bottom:24px}
        .re{background:#fde8e8;color:#b91c1c;border-radius:10px;padding:10px 14px;font-size:13px;margin-bottom:14px}
        .rf{display:flex;flex-direction:column;gap:11px}
        .rrow{display:flex;gap:11px}
        .rfld{position:relative;flex:1}
        .rin{width:100%;padding:13px 44px 13px 18px;border:none;border-radius:50px;background:#dde7ed;color:#1a2533;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:background .2s;appearance:none;-webkit-appearance:none}
        .rin::placeholder{color:#8fa5b4}
        .rin:focus{background:#cfdbe4}
        .ric{position:absolute;right:16px;top:50%;transform:translateY(-50%);color:#8fa5b4;display:flex;align-items:center;pointer-events:none}
        .ricc{pointer-events:auto;cursor:pointer}
        .rsel{width:100%;padding:13px 44px 13px 18px;border:none;border-radius:50px;background:#dde7ed;color:#8fa5b4;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;appearance:none;-webkit-appearance:none;cursor:pointer;transition:background .2s}
        .rsel.hv{color:#1a2533}
        .rsel:focus{background:#cfdbe4}
        .rsw{position:relative}
        .rsc{position:absolute;right:16px;top:50%;transform:translateY(-50%);color:#8fa5b4;pointer-events:none;display:flex;align-items:center}
        .rmw{border-radius:16px;overflow:hidden;height:140px;box-shadow:0 2px 10px rgba(0,0,0,0.08)}
        .rbtn{width:100%;padding:13px;border-radius:50px;border:none;background:#4a6d7c;color:#fff;font-size:15px;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:background .2s,transform .1s}
        .rbtn:hover{background:#3a5a6a;transform:translateY(-1px)}
        .rdiv{display:flex;align-items:center;gap:12px}
        .rdivl{flex:1;height:1px;background:#c5d4dc}
        .rdivt{font-size:11px;color:#8fa5b4;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
        .rgbtn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:10px;border-radius:50px;border:1.5px solid #c5d4dc;background:transparent;color:#4a6d7c;font-size:14px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background .2s}
        .rgbtn:hover{background:#e8f0f5}
        .rfoot{text-align:center;font-size:13.5px;color:#5a7080;font-weight:500}
        .rfoot a{color:#1a2533;font-weight:700;text-decoration:underline;text-underline-offset:2px}
        @media(max-width:680px){.rl{display:none}.rr{padding:32px 24px}.rrow{flex-direction:column}}
      `}</style>

      <div className="rb">
        <div className="rc">
          {/* LEFT — illustration */}
          <div className="rl">
            <svg className="rli" viewBox="0 0 300 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="150" cy="200" rx="130" ry="60" fill="#c5d9e6" opacity="0.4"/>
              <g transform="translate(30,60)">
                <circle cx="30" cy="30" r="22" fill="#f5c5a3"/>
                <rect x="8" y="52" width="44" height="55" rx="10" fill="#7fb3c8"/>
                <line x1="8" y1="68" x2="-8" y2="100" stroke="#7fb3c8" strokeWidth="12" strokeLinecap="round"/>
                <line x1="52" y1="68" x2="68" y2="95" stroke="#7fb3c8" strokeWidth="12" strokeLinecap="round"/>
                <rect x="4" y="107" width="20" height="40" rx="8" fill="#5a8a9f"/>
                <rect x="36" y="107" width="20" height="40" rx="8" fill="#5a8a9f"/>
                <line x1="52" y1="60" x2="80" y2="40" stroke="#7fb3c8" strokeWidth="10" strokeLinecap="round"/>
                <circle cx="82" cy="36" r="8" fill="#f5c5a3"/>
              </g>
              <g transform="translate(95,40)">
                <circle cx="30" cy="28" r="24" fill="#e8b89a"/>
                <rect x="6" y="52" width="48" height="58" rx="10" fill="#9dbfce"/>
                <rect x="2" y="110" width="20" height="42" rx="8" fill="#7aaab8"/>
                <rect x="34" y="110" width="20" height="42" rx="8" fill="#7aaab8"/>
              </g>
              <g transform="translate(170,50)">
                <circle cx="28" cy="28" r="22" fill="#d4a574"/>
                <rect x="12" y="18" width="32" height="12" rx="6" fill="#2a2a2a"/>
                <rect x="6" y="50" width="44" height="56" rx="10" fill="#c8b89a"/>
                <rect x="2" y="106" width="18" height="40" rx="8" fill="#a89878"/>
                <rect x="32" y="106" width="18" height="40" rx="8" fill="#a89878"/>
              </g>
              <g transform="translate(20,120)">
                <circle cx="32" cy="30" r="23" fill="#f0c8a8"/>
                <rect x="10" y="53" width="44" height="58" rx="10" fill="#8bbdd0"/>
                <rect x="18" y="53" width="28" height="48" rx="8" fill="#6aa0b5" opacity="0.6"/>
                <rect x="2" y="111" width="20" height="42" rx="8" fill="#6aa0b5"/>
                <rect x="34" y="111" width="20" height="42" rx="8" fill="#6aa0b5"/>
              </g>
              <g transform="translate(90,130)">
                <circle cx="30" cy="28" r="22" fill="#c88a6a"/>
                <rect x="8" y="50" width="44" height="56" rx="10" fill="#a8c8d8"/>
                <rect x="2" y="106" width="18" height="40" rx="8" fill="#88a8b8"/>
                <rect x="34" y="106" width="18" height="40" rx="8" fill="#88a8b8"/>
              </g>
              <g transform="translate(148,115)">
                <circle cx="32" cy="30" r="24" fill="#e8b88a"/>
                <rect x="8" y="54" width="48" height="60" rx="10" fill="#d4e8d0"/>
                <rect x="4" y="114" width="20" height="44" rx="8" fill="#b4c8b0"/>
                <rect x="36" y="114" width="20" height="44" rx="8" fill="#b4c8b0"/>
              </g>
              <g transform="translate(210,118)">
                <circle cx="30" cy="30" r="23" fill="#d4a070"/>
                <rect x="8" y="53" width="44" height="58" rx="10" fill="#2a3a4a"/>
                <polygon points="30,53 26,90 30,95 34,90" fill="#c84040"/>
                <rect x="2" y="111" width="18" height="42" rx="8" fill="#2a3a4a"/>
                <rect x="34" y="111" width="18" height="42" rx="8" fill="#2a3a4a"/>
              </g>
            </svg>
          </div>

          {/* RIGHT — form */}
          <div className="rr">
            <h1 className="rh">Sign-Up</h1>
            <p className="rs">Create Your Civix Account to Join With Us</p>
            {error && <div className="re">{error}</div>}

            <div className="rf">
              <div className="rfld">
                <input className="rin" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <span className="ric"><UserIcon /></span>
              </div>

              <div className="rfld">
                <input className="rin" type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} required />
                <span className="ric"><MailIcon /></span>
              </div>

              <div className="rrow">
                <div className="rfld">
                  <input className="rin" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                  <span className={`ric ricc`} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </span>
                </div>
                <div className="rfld">
                  <input className="rin" type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                  <span className={`ric ricc`} onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
                  </span>
                </div>
              </div>

              <div className="rsw">
                <select className={`rsel${formData.role ? " hv" : ""}`} name="role" value={formData.role} onChange={handleChange}>
                  <option value="" disabled>Select Role</option>
                  <option value="citizen">Citizen</option>
                  <option value="official">Public Official</option>
                </select>
                <span className="rsc"><ChevronIcon /></span>
              </div>

              <div className="rfld">
                <input className="rin" type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <span className="ric"><MapPinIcon /></span>
              </div>

              <div className="rmw">
                <MapContainer center={mapCoords} zoom={11} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker setFormData={setFormData} setMapCoords={setMapCoords} />
                  <Marker position={mapCoords} />
                </MapContainer>
              </div>

              <button className="rbtn" onClick={handleSubmit}>Sign-Up</button>

              <div className="rdiv">
                <div className="rdivl" />
                <span className="rdivt">Alternative Sign-up Method</span>
                <div className="rdivl" />
              </div>

              <button className="rgbtn"><GoogleIcon /> Google</button>

              <p className="rfoot">Already have an account <Link to="/login">Log-in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
