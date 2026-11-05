import { ktoCaseStudy } from "../../data/ktoCaseStudy";
import "./featured-work.css";

export default function FeaturedWork() {
  return (
    <aside class="featured-work" aria-label="Featured work">
      <p class="featured-work-label">Featured work · KTO</p>
      <a href={ktoCaseStudy.href}>{ktoCaseStudy.title} ↗</a>
      <p>
        Frontend architecture, loading performance and real-time sports data.
      </p>
      <span>40% faster first contentful paint · performance testing</span>
    </aside>
  );
}
