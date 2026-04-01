import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;

  const handleVerify = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          userId,
          otp,
        }
      );

      alert(res.data.message);

      // go to login after success
      navigate("/login");

    } catch (err: any) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">OTP Verification</CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Enter the OTP sent to your email or phone
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-center"
          />

          <Button onClick={handleVerify} className="w-full">
            Verify
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;