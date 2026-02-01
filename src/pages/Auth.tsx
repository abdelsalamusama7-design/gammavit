import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, User, Building2 } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "الاسم الكامل مطلوب"),
  username: z.string().trim().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().trim().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمة المرور غير متطابقة",
  path: ["confirmPassword"],
});

const Auth = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, location.state]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      loginSchema.parse(loginData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0].toString()] = error.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setIsLoading(true);
    const { error } = await signIn(loginData.email, loginData.password);
    setIsLoading(false);

    if (error) {
      let message = isRTL ? "خطأ في تسجيل الدخول" : "Login failed";
      if (error.message.includes("Invalid login credentials")) {
        message = isRTL ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password";
      } else if (error.message.includes("Email not confirmed")) {
        message = isRTL ? "يرجى تأكيد بريدك الإلكتروني أولاً" : "Please confirm your email first";
      }
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: message,
      });
    } else {
      toast({
        title: isRTL ? "مرحباً بك" : "Welcome back",
        description: isRTL ? "تم تسجيل الدخول بنجاح" : "Successfully logged in",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      signupSchema.parse(signupData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0].toString()] = error.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setIsLoading(true);
    const { error } = await signUp(signupData.email, signupData.password, {
      full_name: signupData.fullName,
      username: signupData.username,
    });
    setIsLoading(false);

    if (error) {
      let message = isRTL ? "خطأ في إنشاء الحساب" : "Signup failed";
      if (error.message.includes("User already registered")) {
        message = isRTL ? "هذا البريد الإلكتروني مسجل بالفعل" : "This email is already registered";
      }
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: message,
      });
    } else {
      toast({
        title: isRTL ? "تم إنشاء الحساب" : "Account created",
        description: isRTL
          ? "تم إنشاء حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني للتأكيد."
          : "Your account has been created. Please check your email for confirmation.",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t("common.factoryName")}</CardTitle>
          <CardDescription>
            {isRTL ? "نظام إدارة المصنع" : "Factory Management System"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">
                {isRTL ? "تسجيل الدخول" : "Login"}
              </TabsTrigger>
              <TabsTrigger value="signup">
                {isRTL ? "إنشاء حساب" : "Sign Up"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">
                    {isRTL ? "البريد الإلكتروني" : "Email"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={isRTL ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                      className="pl-10"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">
                    {isRTL ? "كلمة المرور" : "Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder={isRTL ? "أدخل كلمة المرور" : "Enter your password"}
                      className="pl-10"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isRTL ? (
                    "تسجيل الدخول"
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-fullname">
                    {isRTL ? "الاسم الكامل" : "Full Name"}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-fullname"
                      placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
                      className="pl-10"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({ ...signupData, fullName: e.target.value })
                      }
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-username">
                    {isRTL ? "اسم المستخدم" : "Username"}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-username"
                      placeholder={isRTL ? "أدخل اسم المستخدم" : "Enter username"}
                      className="pl-10"
                      value={signupData.username}
                      onChange={(e) =>
                        setSignupData({ ...signupData, username: e.target.value })
                      }
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">
                    {isRTL ? "البريد الإلكتروني" : "Email"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={isRTL ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                      className="pl-10"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">
                    {isRTL ? "كلمة المرور" : "Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder={isRTL ? "أدخل كلمة المرور" : "Enter your password"}
                      className="pl-10"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">
                    {isRTL ? "تأكيد كلمة المرور" : "Confirm Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder={isRTL ? "أعد إدخال كلمة المرور" : "Confirm your password"}
                      className="pl-10"
                      value={signupData.confirmPassword}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isRTL ? (
                    "إنشاء حساب"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
