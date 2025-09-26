'use client';

import { useState, useEffect } from 'react';
import { Star, Eye, Heart, Share2, TrendingUp } from 'lucide-react';

const TrendingWorkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample trending works data
  const trendingWorks = [
    {
      id: 1,
      title: "Digital Dreams",
      author: "Sarah Chen",
      category: "Digital Art",
      views: "12.5K",
      likes: "2.3K",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
      description: "A mesmerizing journey through digital landscapes",
      trending: "#1"
    },
    {
      id: 2,
      title: "Midnight Poetry",
      author: "Alex Rivera",
      category: "Poetry",
      views: "8.7K",
      likes: "1.8K",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      description: "Words that dance in the darkness of night",
      trending: "#2"
    },
    {
      id: 3,
      title: "Urban Chronicles",
      author: "Maya Johnson",
      category: "Photography",
      views: "15.2K",
      likes: "3.1K",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      description: "Capturing the soul of city life",
      trending: "#3"
    },
    {
      id: 4,
      title: "Harmony in Motion",
      author: "David Kim",
      category: "Music",
      views: "9.4K",
      likes: "2.0K",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "Melodies that move the heart and soul",
      trending: "#4"
    },
    {
      id: 5,
      title: "Canvas of Emotions",
      author: "Elena Rossi",
      category: "Painting",
      views: "11.8K",
      likes: "2.7K",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      description: "Colors that speak louder than words",
      trending: "#5"
    },
    {
      id: 6,
      title: "Future Stories",
      author: "Marcus Webb",
      category: "Writing",
      views: "7.3K",
      likes: "1.5K",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
      description: "Sci-fi tales that challenge reality",
      trending: "#6"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === trendingWorks.length - 3 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [trendingWorks.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === trendingWorks.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? trendingWorks.length - 3 : prevIndex - 1
    );
  };

  return (
    <section className="trending-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="trending-badge">
            <TrendingUp className="trending-icon" />
            <span>Trending Now</span>
          </div>
          <h2 className="section-title">
            <span className="gradient-text">Discover</span> Amazing{' '}
            <span className="highlight-text">Creations</span>
          </h2>
          <p className="section-description">
            Explore the most popular and inspiring works from our creative community. 
            These masterpieces are capturing hearts and minds across the platform.
          </p>
        </div>

        {/* Cards Gallery */}
        <div className="gallery-container">
          <button 
            className="nav-button nav-button-left"
            onClick={prevSlide}
            aria-label="Previous works"
          >
            ←
          </button>
          
          <div className="cards-wrapper">
            <div 
              className="cards-track"
              style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
            >
              {trendingWorks.map((work, index) => (
                <div key={work.id} className="work-card">
                  <div className="card-image-container">
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="card-image"
                    />
                    <div className="trending-number">{work.trending}</div>
                    <div className="card-overlay">
                      <div className="overlay-actions">
                        <button className="action-btn">
                          <Eye size={16} />
                        </button>
                        <button className="action-btn">
                          <Heart size={16} />
                        </button>
                        <button className="action-btn">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="work-title">{work.title}</h3>
                      <div className="rating">
                        <Star className="star-icon" />
                        <span>{work.rating}</span>
                      </div>
                    </div>
                    
                    <p className="work-description">{work.description}</p>
                    
                    <div className="card-meta">
                      <div className="author-info">
                        <span className="category-tag">{work.category}</span>
                        <span className="author">by {work.author}</span>
                      </div>
                      
                      <div className="stats">
                        <span className="stat">
                          <Eye size={14} />
                          {work.views}
                        </span>
                        <span className="stat">
                          <Heart size={14} />
                          {work.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="nav-button nav-button-right"
            onClick={nextSlide}
            aria-label="Next works"
          >
            →
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="pagination">
          {Array.from({ length: trendingWorks.length - 2 }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .trending-section {
          position: relative;
          padding: 80px 20px;
          background: 
            radial-gradient(circle at 20% 30%, rgba(139, 69, 199, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            #0a0a0a;
          animation: breathe 8s ease-in-out infinite alternate;
          overflow: hidden;
        }

        @keyframes breathe {
          0% {
            background: 
              radial-gradient(circle at 20% 30%, rgba(139, 69, 199, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              #0a0a0a;
          }
          50% {
            background: 
              radial-gradient(circle at 30% 40%, rgba(139, 69, 199, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 60%),
              #0a0a0a;
          }
          100% {
            background: 
              radial-gradient(circle at 60% 20%, rgba(139, 69, 199, 0.35) 0%, transparent 55%),
              radial-gradient(circle at 30% 80%, rgba(16, 185, 129, 0.35) 0%, transparent 55%),
              radial-gradient(circle at 80% 40%, rgba(59, 130, 246, 0.25) 0%, transparent 55%),
              #0a0a0a;
          }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .trending-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(139, 69, 199, 0.2);
          border: 1px solid rgba(139, 69, 199, 0.3);
          padding: 8px 16px;
          border-radius: 20px;
          color: #a855f7;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .trending-icon {
          width: 16px;
          height: 16px;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a855f7, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .highlight-text {
          background: linear-gradient(135deg, #10b981, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .gallery-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: white;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-button-left {
          left: -25px;
        }

        .nav-button-right {
          right: -25px;
        }

        .cards-wrapper {
          flex: 1;
          overflow: hidden;
          border-radius: 20px;
        }

        .cards-track {
          display: flex;
          gap: 30px;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .work-card {
          flex: 0 0 calc(33.333% - 20px);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .work-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(139, 69, 199, 0.3);
        }

        .card-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .work-card:hover .card-image {
          transform: scale(1.1);
        }

        .trending-number {
          position: absolute;
          top: 15px;
          left: 15px;
          background: linear-gradient(135deg, #a855f7, #3b82f6);
          color: white;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .work-card:hover .card-overlay {
          opacity: 1;
        }

        .overlay-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          transform: scale(1.1);
          background: white;
        }

        .card-content {
          padding: 25px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .work-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin: 0;
          flex: 1;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #fbbf24;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .star-icon {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .work-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .category-tag {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          width: fit-content;
        }

        .author {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
        }

        .stats {
          display: flex;
          gap: 15px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: linear-gradient(135deg, #a855f7, #3b82f6);
          transform: scale(1.2);
        }

        @media (max-width: 1024px) {
          .work-card {
            flex: 0 0 calc(50% - 15px);
          }
          
          .nav-button {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .trending-section {
            padding: 60px 15px;
          }
          
          .work-card {
            flex: 0 0 calc(100% - 10px);
          }
          
          .cards-track {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default TrendingWorkSection;