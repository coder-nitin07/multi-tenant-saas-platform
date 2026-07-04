import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Rocket, ShieldCheck, Users } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/auth.validation";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

function Register() {
  const { register: registerUser } = useAuth();

  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data)=>{
    try {
      await registerUser (data);

      navigate('/dashboard');
      console.log('Register successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-amber-600">

      {/* left-section */}
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


      {/* right section */}
      <div className="flex items-center justify-center bg-slate-100 p-6">
        <Card className='w-full max-w-md shadow-xl'>
            <CardHeader>

              <CardTitle className='text-3xl'>
                  Welcome to the Organization
              </CardTitle>

              <CardDescription>
                  Create your own Organization to manage work.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={ handleSubmit(onSubmit) } className='space-y-5'>
                  <div>
                    <Label>Email</Label>

                    <Input
                        type='email'
                        placeholder='enter your email'
                        { ...register('email') }
                    />

                    { errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                          { errors.email.message }
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Password</Label>

                    <Input
                        type='password'
                        placeholder='enter your password'
                        { ...register('password') }
                    />

                    { errors.password && (
                      <p className="text-sm text-red-500 mt-1">
                        { errors.email.message }
                      </p>
                    )}
                  </div>


                  <div className="space-y-4">
                      <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                    id="remember"
                                    className="border-slate-400 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600" 
                                  />

                                <Label>Remember me</Label>
                            </div>
                      

                            <button
                              type='button'
                              className="text-sm text-cyan-600 hover:underline"
                            >
                              Forgot Password?
                            </button>
                      </div>

                      {/* register button */}
                      <Button className='w-full'>
                          Register
                      </Button>

                      {/* login link */}
                      <p className="text-center text-sm text-slate-500">
                        Already have an account?{" "}

                        <Link
                          to='/login'
                          className="text-cyan-600 font-medium hover:underline"
                        >
                          Login
                        </Link>
                      </p>
                  </div>
              </form>
            </CardContent>
        </Card>
      </div>
    </div>
  )
};

export default Register