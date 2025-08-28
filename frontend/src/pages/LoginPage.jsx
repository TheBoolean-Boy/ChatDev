import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageCircleCode } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";


const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { login, isLogginIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is requird to lgin");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password can't be empty");
    if (formData.password.length < 6) return toast.error("Password must contain atlest 6 characters")

    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success) {
      login(formData);
    }
  }
  return (
    <div className=' min-h-screen grid lg:grid-cols-2'>
      {/*Left Side */}
      <div className=' flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div>
                <div
                  className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
                             group-hover:bg-primary/20 transition-all hover:scale-105 duration-300"
                >
                  <MessageCircleCode className="size-6 text-primary cursor-pointer " />
                </div>
              </div>
              <h1 className="text-2xl font-bold mt-2">Login to Conitue chatting</h1>
              <p className="text-base-content/60">Continue using for free</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className=' space-y-6'>


            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={' input input-bordered w-full pl-10'}
                  placeholder="amigo@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* password  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={'input input-bordered w-full pl-10'}
                  placeholder="your pass••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* submit button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isLogginIn}>
              {isLogginIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>

            <div className="text-center">
              <p className="text-base-content/60">
                Don't have an account?{" "}
                <Link to="/signup" className="link link-primary">
                  Sign Up
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>


      {/* Right Side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default LogInPage
