import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Mail, ArrowRight, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("OTP sent to your email");
      setStep("otp");
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete OTP");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-card p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Building2 className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">RAENGICORE</h1>
            <p className="text-sm text-muted-foreground">INFRA LLP</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-foreground">
            Business
            <br />
            <span className="text-gradient">Control System</span>
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">
            Complete financial and compliance management for your infrastructure business.
            Track GST, TDS, expenses, and compliance in one powerful platform.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-success" />
              Secure Access
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 text-success" />
              Owner Only
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © 2026 RAENGICORE INFRA LLP. All rights reserved.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full flex-col items-center justify-center bg-background px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">RAENGICORE</h1>
              <p className="text-xs text-muted-foreground">INFRA LLP</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {step === "email" ? "Sign In" : "Enter OTP"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {step === "email"
                  ? "Enter your email to receive a one-time password"
                  : `We've sent a 6-digit code to ${email}`}
              </p>
            </div>

            {step === "email" ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="owner@raengicore.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-10"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full gap-2"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  className="h-12 w-full gap-2"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                  }}
                  className="w-full text-center text-sm text-muted-foreground hover:text-primary"
                >
                  Use different email
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
