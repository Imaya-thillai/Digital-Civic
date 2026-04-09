import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rb {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #c8d8e4 0%, #dce8f0 40%, #b8cdd8 100%);
          padding: 16px;
          font-family: 'DM Sans', sans-serif;
        }

        .rc {
          width: 100%;
          max-width: 980px;
          background: #f0f4f7;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          display: flex;
          overflow: hidden;
        }

        .rl {
          flex: 0 0 40%;
          background: linear-gradient(160deg, #e8eff4 0%, #d4e2ea 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 28px;
        }
        .rli { width: 100%; max-width: 260px; }

        .rr {
          flex: 1;
          padding: 36px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow-y: auto;
          max-height: 100vh;
        }

        .rh { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 600; color: #1a2533; margin-bottom: 4px; }
        .rs { font-size: 13px; color: #7a8fa0; margin-bottom: 22px; line-height: 1.5; }
        .re { background: #fde8e8; color: #b91c1c; border-radius: 10px; padding: 10px 14px; font-size: 13px; margin-bottom: 14px; }

        .rf { display: flex; flex-direction: column; gap: 11px; }
        .rrow { display: flex; gap: 11px; }
        .rfld { position: relative; flex: 1; }

        .rin {
          width: 100%;
          padding: 13px 44px 13px 18px;
          border: none;
          border-radius: 50px;
          background: #dde7ed;
          color: #1a2533;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: background 0.2s;
          appearance: none;
          -webkit-appearance: none;
        }
        .rin::placeholder { color: #8fa5b4; }
        .rin:focus { background: #cfdbe4; }

        .ric { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #8fa5b4; display: flex; align-items: center; pointer-events: none; }
        .ricc { pointer-events: auto; cursor: pointer; }

        .rsw { position: relative; }
        .rsel {
          width: 100%;
          padding: 13px 44px 13px 18px;
          border: none;
          border-radius: 50px;
          background: #dde7ed;
          color: #8fa5b4;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rsel.hv { color: #1a2533; }
        .rsel:focus { background: #cfdbe4; }
        .rsc { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #8fa5b4; pointer-events: none; display: flex; align-items: center; }

        .rmw { border-radius: 16px; overflow: hidden; height: 150px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }

        .rbtn {
          width: 100%;
          padding: 14px;
          border-radius: 50px;
          border: none;
          background: #4a6d7c;
          color: #fff;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          letter-spacing: 0.02em;
        }
        .rbtn:hover { background: #3a5a6a; transform: translateY(-1px); }

        .rfoot { text-align: center; font-size: 13.5px; color: #5a7080; font-weight: 500; }
        .rfoot a { color: #1a2533; font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }

        /* Tablet */
        @media (max-width: 820px) {
          .rl { flex: 0 0 36%; padding: 28px 18px; }
          .rr { padding: 28px 28px; }
          .rh { font-size: 26px; }
        }

        /* Mobile — slide-up sheet, stack password fields */
        @media (max-width: 620px) {
          .rb { padding: 0; align-items: flex-end; background: linear-gradient(160deg, #c8d8e4 0%, #b8cdd8 100%); }
          .rc { border-radius: 22px 22px 0 0; box-shadow: 0 -8px 40px rgba(0,0,0,0.15); }
          .rl { display: none; }
          .rr { padding: 32px 20px 44px; max-height: 92vh; overflow-y: auto; }
          .rrow { flex-direction: column; gap: 11px; }
          .rh { font-size: 24px; }
          .rin { font-size: 16px; padding: 14px 44px 14px 18px; }
          .rsel { font-size: 16px; }
          .rbtn { padding: 16px; font-size: 16px; }
          .rmw { height: 130px; }
          .rf { gap: 10px; }
        }

        @media (max-width: 360px) {
          .rr { padding: 26px 16px 40px; }
          .rh { font-size: 22px; }
        }
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
            <p className="rs">Create your CIVIX account to join the community.</p>
            {error && <div className="re">{error}</div>}

            <div className="rf">
              <div className="rfld">
                <input className="rin" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required autoComplete="name" />
                <span className="ric"><UserIcon /></span>
              </div>

              <div className="rfld">
                <input className="rin" type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} required autoComplete="email" />
                <span className="ric"><MailIcon /></span>
              </div>

              <div className="rrow">
                <div className="rfld">
                  <input className="rin" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required autoComplete="new-password" />
                  <span className="ric ricc" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </span>
                </div>
                <div className="rfld">
                  <input className="rin" type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required autoComplete="new-password" />
                  <span className="ric ricc" onClick={() => setShowConfirm(!showConfirm)}>
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

              <p className="rfoot">Already have an account? <Link to="/login">Log-in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
