import { Hero } from "@/components/landing/Hero";
import { FeaturedCourses } from "@/components/landing/FeaturedCourses";
import { UpcomingTrainings } from "@/components/landing/UpcomingTrainings";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <UpcomingTrainings />
      <Testimonials />
      <CTA />
    </>
  );
}
