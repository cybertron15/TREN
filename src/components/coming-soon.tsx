import { HardHat, Hammer } from 'lucide-react';

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex mt-[10%] justify-center bg-background  px-4">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-2">
          <Hammer className="w-10 h-10 animate-bounce text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Coming Soon</h1>
        <p className="text-lg max-w-md mx-auto">
          We're currently working on building something awesome. 🚧
          <br />
          Hang tight — this page is under construction!
        </p>
      </div>
    </div>
  );
}
