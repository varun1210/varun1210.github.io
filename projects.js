document.addEventListener('DOMContentLoaded', function() {
  // Project data
  const projects = [
    {
      id: 1,
      title: "Olist E-commerce Data Analysis",
      shortDescription: "E-commerce data pipeline and analytics",
      technologies: "AWS Lambda, AWS Glue, AWS S3, AWS Redshift, Docker",
      fullDescription: "Engineered a serverless end-to-end data pipeline using AWS Lambda, AWS Glue, and AWS S3 to fetch and clean data from various APIs, storing results in an AWS Redshift data warehouse. Created Tableau dashboards to visualize sales and logistics metrics over a 3-year period, deriving key business insights that helped drive strategic decisions.",
      githubLink: "https://github.com/varun1210/Olist-Analysis",
      image: "./project_images/olist.png"
    },
    {
      id: 2,
      title: "Buffalo Crime Analysis",
      shortDescription: "Crime data pipeline and visualization",
      technologies: "Apache Airflow, BigQuery, Looker, Google Cloud Storage",
      fullDescription: "Designed and deployed a comprehensive data pipeline using Apache Airflow to fetch Buffalo CitiStat data from APIs, then scrape, clean, and load it into a BigQuery warehouse. Developed detailed crime reporting analytics for the police department by visualizing key crime metrics, delivering actionable insights that contributed to reducing crime rates in multiple neighborhoods.",
      githubLink: "https://github.com/varun1210/Buffalo-Crime",
      image: "./project_images/buffalo.jpg"
    },
    {
      id: 3,
      title: "Reinforcement Learning Agent",
      shortDescription: "Grid world problem solver using RL",
      technologies: "Optuna, Gymnasium, Python, NumPy",
      fullDescription: "Used Gymnasium to model and simulate a complex grid world environment and developed a robotic agent to solve for maximum rewards. Implemented SARSA and Q-Learning algorithms from scratch to allow the robotic agent to efficiently navigate and solve the grid world challenges. Performed extensive hyperparameter tuning using Optuna to optimize performance across various scenarios.",
      githubLink: "https://github.com/varun1210/Reinforcement-Learning-Agent",
      image: "./project_images/robot.png"
    },
    {
      id: 4,
      title: "Credit Churn Prediction",
      shortDescription: "ML model for predicting customer churn",
      technologies: "Node.js, Express.js, Scikit-learn, Pandas",
      fullDescription: "Applied exploratory data analysis (EDA), statistical analysis, and advanced feature engineering techniques to develop a neural network model that accurately predicts churn rates for a credit agency. The model achieved 97% accuracy, 94% average precision, and 95% average recall. Additionally, built a web application using Node.js and Express.js to deploy the model as a user-friendly data product for business analysts.",
      githubLink: "https://github.com/varun1210/Credit-Attrition",
      image: "./project_images/credit.png"
    },
    {
      id: 5,
      title: "Outreach Bot",
      shortDescription: "Automated networking using web scraping",
      technologies: "Python, PostgreSQL",
      fullDescription: "Developed an automation tool for cold emailing using data scraped from a the world's largest professional networking social media website. Application data is saved to Postgres to generate automated reporting for outreach statistics.",
      githubLink: "https://github.com/varun1210/Email-Sender",
      image: "./project_images/email.png"
    },
    {
      id: 6,
      title: "Periscope Job Matcher",
      shortDescription: "Job matching system with resume analysis",
      technologies: "Apache Airflow, MongoDB, PostgreSQL, FastAPI, React",
      fullDescription: "Designed and deployed a data pipeline using Apache Airflow to scrape, clean, and load job data to MySQL. Created a monolithic backend with 3 modules using FastAPI to perform CRUD operations and enable search functionality to match users with jobs based on their resume. Designed and developed frontend using React.js for web-based clients to interact with the application.",
      githubLink: "https://github.com/varun1210/Periscope",
      image: "./project_images/periscope.png"
    },
    {
      id: 7,
      title: "Transaction Processor",
      shortDescription: "Event-driven transaction processing system",
      technologies: "Spring Boot, Event Sourcing, Microservices",
      fullDescription: "Built a transaction processing system using Spring Boot with an event-driven architecture. The system follows a structured flow where transactions are received by a controller, processed by a transaction service, and then published to an event service. Events are stored in an event store for durability, while an event listener updates the application state. This architecture enables high throughput, resilience, and event sourcing capabilities, making it suitable for financial or high-volume transaction processing applications.",
      githubLink: "https://github.com/varun1210/Transaction-Processor",
      image: "./project_images/transactions.png"
    }
  ];

  // DOM elements
  const carouselTrack = document.getElementById('carouselTrack');
  const projectDetail = document.getElementById('projectDetail');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  
  // State variables
  let currentIndex = 0;
  const cardWidth = 320; // Card width + margin
  const visibleCards = 3; // Number of cards visible at once (adjust based on your design)
  
  // Initialize the carousel with project cards
  function initializeCarousel() {
    // Clear the track first
    carouselTrack.innerHTML = '';
    
    // Create a circular display by adding clones at both ends
    // Add last few projects at the beginning for seamless backwards navigation
    for (let i = projects.length - visibleCards; i < projects.length; i++) {
      const cloneCard = createProjectCard(projects[i], i, true);
      carouselTrack.appendChild(cloneCard);
    }
    
    // Add all projects in normal order
    projects.forEach((project, index) => {
      const card = createProjectCard(project, index, false);
      carouselTrack.appendChild(card);
    });
    
    // Add first few projects at the end for seamless forward navigation
    for (let i = 0; i < visibleCards; i++) {
      const cloneCard = createProjectCard(projects[i], i, true);
      carouselTrack.appendChild(cloneCard);
    }
    
    // Show details for the first project initially
    showProjectDetails(projects[0]);
    
    // Set the initial position to skip the clones and show the real first items
    currentIndex = visibleCards;
    updateActiveCard();
    updateCarouselPosition(false);
  }
  
  // Create a project card element
  function createProjectCard(project, index, isClone) {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.dataset.index = index;
    if (isClone) {
      card.dataset.clone = true;
    }
    
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="card-image">
      <div class="card-content">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-subtitle">${project.shortDescription}</p>
      </div>
    `;
    
    card.addEventListener('click', () => {
      const realIndex = index % projects.length; // Get the real index for cloned items
      currentIndex = isClone ? (realIndex + visibleCards) : index + visibleCards;
      updateActiveCard();
      showProjectDetails(projects[realIndex]);
      updateCarouselPosition(true);
    });
    
    return card;
  }
  
  // Display project details
  function showProjectDetails(project) {
    projectDetail.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-detail-image">
      <div class="project-detail-content">
        <h2 class="project-detail-title">${project.title}</h2>
        <div class="project-detail-subtitle">
          <span class="project-detail-technologies"><b>${project.technologies}</b> | </span>
          <a href="${project.githubLink}" class="project-github-link" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Source Code <>
          </a>
        </div>
        <p class="project-detail-description">${project.fullDescription}</p>
      </div>
    `;
  }
  
  // Update which card has the active class
  function updateActiveCard() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      if (index === currentIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }
  
  // Move carousel to center the active card with smooth transition for circular navigation
  function updateCarouselPosition(animate = true) {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const exactCenterOffset = (containerWidth / 2) - (cardWidth / 2);
    
    // Calculate position to center the active card perfectly
    const position = -currentIndex * cardWidth + exactCenterOffset;
    
    // Temporarily disable transition for instant repositioning if needed
    if (!animate) {
      carouselTrack.style.transition = 'none';
    }
    
    // Apply the transform
    carouselTrack.style.transform = `translateX(${position}px)`;
    
    // Re-enable transition after browser has time to process the transform
    if (!animate) {
      setTimeout(() => {
        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    }
    
    // Handle edge cases for infinite scrolling illusion
    handleInfiniteScrolling();
  }
  
  // Handle the infinite scrolling illusion by repositioning when reaching cloned elements
  function handleInfiniteScrolling() {
    const totalRealCards = projects.length;
    const totalCards = totalRealCards + (visibleCards * 2); // Real + clones
    
    setTimeout(() => {
      // If we've scrolled into the left clones
      if (currentIndex < visibleCards) {
        // Jump to the equivalent position among the real items (from the end)
        currentIndex = totalRealCards + currentIndex;
        updateCarouselPosition(false);
      }
      // If we've scrolled into the right clones
      else if (currentIndex >= totalRealCards + visibleCards) {
        // Jump to the equivalent position among the real items (from the beginning)
        currentIndex = currentIndex - totalRealCards;
        updateCarouselPosition(false);
      }
    }, 500); // Wait for the transition to complete
  }
  
  // Event listeners for navigation buttons for circular carousel
  prevButton.addEventListener('click', () => {
    currentIndex--;
    updateActiveCard();
    showProjectDetails(projects[(currentIndex - visibleCards + projects.length) % projects.length]);
    updateCarouselPosition(true);
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex++;
    updateActiveCard();
    showProjectDetails(projects[(currentIndex - visibleCards) % projects.length]);
    updateCarouselPosition(true);
  });
  
  // Initialize the carousel
  initializeCarousel();
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevButton.click();
    } else if (e.key === 'ArrowRight') {
      nextButton.click();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    updateCarouselPosition(false);
  });
});