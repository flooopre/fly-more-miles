import { Link } from "react-router-dom";
import { ArrowRight, Plane } from "lucide-react";

interface BlogCTAProps {
  milesType: "avios" | "flyingblue" | "both";
}

const BlogCTA = ({ milesType }: BlogCTAProps) => {
  if (milesType === "both") {
    return (
      <div className="my-10 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Plane className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wide opacity-90">Skip the Points Grind</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Need Miles Fast?</h3>
        <p className="text-white/85 mb-6 leading-relaxed">
          Whether you need Avios or Flying Blue miles — get them delivered to your account in 24–48 hours. Better rates than buying directly from the airline.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/buy-avios"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Buy Avios <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/buy-flying-blue-miles"
            className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors border border-white/30"
          >
            Buy Flying Blue Miles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isAvios = milesType === "avios";
  const title = isAvios ? "Need Avios Fast?" : "Need Flying Blue Miles Fast?";
  const description = isAvios
    ? "Skip the credit card points grind. Get Avios delivered directly to your British Airways Executive Club account in 24–48 hours — at rates better than BA's own sale prices."
    : "Skip the credit card points grind. Get Flying Blue miles delivered directly to your Air France-KLM account in 24–48 hours — at rates better than buying from the airline.";
  const link = isAvios ? "/buy-avios" : "/buy-flying-blue-miles";
  const buttonText = isAvios ? "Get Your Avios Quote →" : "Get Your Flying Blue Quote →";

  return (
    <div className="my-10 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Plane className="w-5 h-5" />
        <span className="text-sm font-medium uppercase tracking-wide opacity-90">Skip the Points Grind</span>
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-white/85 mb-6 leading-relaxed">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default BlogCTA;
