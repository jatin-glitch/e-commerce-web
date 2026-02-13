import { useEffect, useState } from 'react';
import api from '../lib/api.js';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // In a real app, this would fetch from your API
        // For now, using static reviews data
        const staticReviews = [
          {
            id: 1,
            name: "Ahmed R.",
            rating: 5,
            date: "2 days ago",
            text: "Amazing quality products! The Meta Glass exceeded my expectations. Fast delivery and excellent customer service. Will definitely order again.",
            product: "Meta Glass Pro - AR Smart Glasses"
          },
          {
            id: 2,
            name: "Sarah K.",
            rating: 4,
            date: "1 week ago",
            text: "Professional Studio Headphones are perfect for my music production. Crystal clear sound and very comfortable. Best purchase I've made this year!",
            product: "Professional Studio Headphones"
          },
          {
            id: 3,
            name: "Fahad M.",
            rating: 5,
            date: "2 weeks ago",
            text: "The Smart Fitness Watch tracks everything accurately. Battery life is amazing and the app is very user-friendly. Highly recommended!",
            product: "Smart Fitness Watch"
          },
          {
            id: 4,
            name: "Ayesha H.",
            rating: 4,
            date: "3 weeks ago",
            text: "Wireless Earbuds Pro have incredible sound quality. The noise cancellation is top-notch and battery life is exactly as advertised. Perfect for my daily commute!",
            product: "Wireless Earbuds Pro"
          },
          {
            id: 5,
            name: "Omar S.",
            rating: 5,
            date: "1 month ago",
            text: "Digital Camera Pro is worth every penny. The image quality is professional grade and the autofocus system is lightning fast. Love it!",
            product: "Digital Camera Pro"
          }
        ];
        setReviews(staticReviews);
      } catch (err) {
        console.error('Failed to load reviews', err);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'star' : 'star-empty'}`}>
        ★
      </span>
    ));
  };

  if (loading) return <div className="centered-page">Loading reviews...</div>;

  return (
    <div className="reviews-page">
      <div className="container">
        <h1 className="page-title">Customer Reviews</h1>
        <p className="page-subtitle">
          See what our customers are saying about our products
        </p>
        
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.name}</span>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-text">{review.text}</p>
              <div className="review-product">{review.product}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
