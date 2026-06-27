import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Rocket, ShieldCheck, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth.validation";
import useAuth from "@/hooks/useAuth";

function Login() {
    const { login } = useAuth();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
      } = useForm({ 
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data)=>{
      try {
        await login(data);

        navigate('/dashboard');
        console.log('Login Successfully');
      } catch (err) {
        console.error(err);
      }
    };


    const navigate = useNavigate();
    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* Left Section */}
            <div className="hidden lg:flex flex-col justify-center bg-slate-950 text-white p-16">

                <div className="flex items-center gap-3 mb-8">
                    <Rocket className="w-10 h-10 text-cyan-400" />
                    <h1 className="text-4xl font-bold">
                        Multi-Tenant SaaS
                    </h1>
                </div>

                <p className="text-slate-400 text-lg leading-8 max-w-lg mb-10">
                    Build scalable SaaS applications with organizations,
                    role-based access control, invitations, notifications,
                    Redis caching and much more.
                </p>

                <div className="space-y-6">

                    <div className="flex items-center gap-3">
                        <ShieldCheck className="text-green-400" />
                        <span>Secure JWT Authentication</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Users className="text-cyan-400" />
                        <span>Multi Organization Support</span>
                    </div>

                </div>

            </div>

            {/* Right Section */}

            <div className="flex items-center justify-center bg-slate-100 p-6">

                <Card className="w-full max-w-md shadow-xl">

                    <CardHeader>

                        <CardTitle className="text-3xl">
                            Welcome Back
                        </CardTitle>

                        <CardDescription>
                            Login to continue managing your organizations.
                        </CardDescription>

                    </CardHeader>

                    <CardContent>

                        <form onSubmit={ handleSubmit(onSubmit) } className="space-y-5">

                            <div>
                                <Label>Email</Label>

                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    { ...register('email') }
                                />

                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label>Password</Label>

                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    { ...register('password') }
                                />

                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between items-center">

                                <div className="flex items-center gap-2">

                                    <Checkbox />

                                    <Label>Remember me</Label>

                                </div>

                                <button
                                    type="button"
                                    className="text-sm text-cyan-600 hover:underline"
                                >
                                    Forgot Password?
                                </button>

                            </div>

                            <Button className="w-full">
                                Login
                            </Button>

                            <p className="text-center text-sm text-slate-500">

                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="text-cyan-600 font-medium hover:underline"
                                >
                                    Register
                                </Link>

                            </p>

                        </form>

                    </CardContent>

                </Card>

            </div>

        </div>
    );
}

export default Login;