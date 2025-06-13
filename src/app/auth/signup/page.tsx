import SignupForm from "@/components/auth/SignupForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[200%] w-[200%] -translate-x-1/2 -rotate-45 bg-white bg-opacity-50">
          <div className="absolute inset-0 flex items-center justify-center text-gray-200 text-[20rem] font-bold whitespace-nowrap">
            ShareSpace
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto px-4 relative z-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up for ShareSpace</CardTitle>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/auth/signin" className="text-blue-500 hover:underline">
                Log in
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
