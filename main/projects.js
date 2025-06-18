// Project data
        const projects = [
            {
                id: 1,
                title: "Personal Portfolio Website",
                description: "A responsive portfolio website built with HTML5, CSS3, TailwindCSS and JavaScript to showcase my work.",
                image: "assets/images/projects/image(1).png",
                tags: ["HTML", "CSS", "JavaScript", "Tailwind"],
                type: "Portfolio",
                demoLink: "https://dineshkumar-pro.web.app",
                codeLink: "https://github.com/DineshKumarV-Pro/portfolio",
                date: "June 2024"
            },
            {
                id: 2,
                title: "WeatherlyWave",
                description: "A weather application that fetches data from a weather API and displays forecasts.",
                image: "assets/images/projects/image(2).png",
                tags: ["HTML", "TailwindCSS", "JavaScript"],
                type: "Web App",
                demoLink: "https://weatherlywave.web.app",
                codeLink: "https://github.com/DineshKumarV-Pro/weather-dashboard",
                date: "March 2024"
            },
            {
                id: 3,
                title: "E-commerce Landing Page",
                description: "A modern landing page for an e-commerce site using Bootstrap with responsive design.",
                image: "assets/images/project2.jpg",
                tags: ["HTML", "CSS", "Bootstrap"],
                type: "Landing Page",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/ecommerce-landing",
                date: "May 2024"
            },
            {
                id: 4,
                title: "Task Management App",
                description: "A simple task management application built with JavaScript to organize daily tasks.",
                image: "assets/images/project3.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/task-manager",
                date: "April 2024"
            },
            
            {
                id: 5,
                title: "Recipe Finder",
                description: "An application that helps users find recipes based on ingredients they have.",
                image: "assets/images/project5.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/recipe-finder",
                date: "February 2024"
            },
            {
                id: 6,
                title: "Blog Website",
                description: "A responsive blog website with multiple articles and categories.",
                image: "assets/images/project6.jpg",
                tags: ["HTML", "CSS", "Bootstrap"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/blog-website",
                date: "January 2024"
            },
            {
                id: 7,
                title: "Quiz App",
                description: "An interactive quiz application with multiple categories and score tracking.",
                image: "assets/images/project7.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/quiz-app",
                date: "December 2023"
            },
            {
                id: 8,
                title: "Expense Tracker",
                description: "A simple expense tracker to monitor monthly spending and income.",
                image: "assets/images/project8.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/expense-tracker",
                date: "November 2023"
            },
            {
                id: 9,
                title: "Social Media Dashboard",
                description: "A dashboard UI for a social media platform with dark mode toggle.",
                image: "assets/images/project9.jpg",
                tags: ["HTML", "CSS", "JavaScript", "Tailwind"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/social-dashboard",
                date: "October 2023"
            },
            {
                id: 10,
                title: "Restaurant Website",
                description: "A responsive website for a restaurant with menu and reservation system.",
                image: "assets/images/project10.jpg",
                tags: ["HTML", "CSS", "Bootstrap"],
                type: "Landing Page",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/restaurant-website",
                date: "September 2023"
            },
            {
                id: 11,
                title: "Fitness Tracker",
                description: "An application to track workouts and fitness progress.",
                image: "assets/images/project11.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/fitness-tracker",
                date: "August 2023"
            },
            {
                id: 12,
                title: "Travel Agency Website",
                description: "A landing page for a travel agency showcasing destinations and packages.",
                image: "assets/images/project12.jpg",
                tags: ["HTML", "CSS", "Bootstrap"],
                type: "Landing Page",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/travel-agency",
                date: "July 2023"
            },
            {
                id: 13,
                title: "Book Library",
                description: "A digital library to track reading progress and manage books.",
                image: "assets/images/project13.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/book-library",
                date: "June 2023"
            },
            {
                id: 14,
                title: "Music Player",
                description: "A web-based music player with playlist functionality.",
                image: "assets/images/project14.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/music-player",
                date: "May 2023"
            },
            {
                id: 15,
                title: "Hotel Booking System",
                description: "A simple interface for booking hotel rooms with date selection.",
                image: "assets/images/project15.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/hotel-booking",
                date: "April 2023"
            },
            {
                id: 16,
                title: "Calculator App",
                description: "A functional calculator with basic arithmetic operations.",
                image: "assets/images/project16.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/calculator",
                date: "March 2023"
            },
            {
                id: 17,
                title: "To-Do List App",
                description: "A simple to-do list application with task management features.",
                image: "assets/images/project17.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/todo-app",
                date: "February 2023"
            },
            {
                id: 18,
                title: "Countdown Timer",
                description: "A customizable countdown timer for events and special occasions.",
                image: "assets/images/project18.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/countdown-timer",
                date: "January 2023"
            },
            {
                id: 19,
                title: "Memory Game",
                description: "A card matching memory game with score tracking.",
                image: "assets/images/project19.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/memory-game",
                date: "December 2022"
            },
            {
                id: 20,
                title: "Password Generator",
                description: "A tool to generate secure random passwords with customizable options.",
                image: "assets/images/project20.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/password-generator",
                date: "November 2022"
            },
            {
                id: 21,
                title: "Currency Converter",
                description: "A simple currency converter using exchange rate API.",
                image: "assets/images/project21.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/currency-converter",
                date: "October 2022"
            },
            {
                id: 22,
                title: "Note Taking App",
                description: "A web application for creating and managing notes.",
                image: "assets/images/project22.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/notes-app",
                date: "September 2022"
            },
            {
                id: 23,
                title: "BMI Calculator",
                description: "A body mass index calculator with health recommendations.",
                image: "assets/images/project23.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/bmi-calculator",
                date: "August 2022"
            },
            {
                id: 24,
                title: "Age Calculator",
                description: "A tool to calculate age based on birth date.",
                image: "assets/images/project24.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/age-calculator",
                date: "July 2022"
            },
            {
                id: 25,
                title: "Random Quote Generator",
                description: "Displays random inspirational quotes with share functionality.",
                image: "assets/images/project25.jpg",
                tags: ["HTML", "CSS", "JavaScript"],
                type: "Web App",
                demoLink: "#",
                codeLink: "https://github.com/DineshKumarV-Pro/quote-generator",
                date: "June 2022"
            }
        ];
            // DOM Elements
            document.addEventListener('DOMContentLoaded', () => {
            const projectsContainer = document.getElementById('projects-container');
            const paginationContainer = document.getElementById('pagination');
            const searchInput = document.getElementById('project-search');
            const searchSuggestions = document.getElementById('search-suggestions');
            const filterToggle = document.getElementById('filter-toggle');
            const filterDropdown = document.getElementById('filter-dropdown');
            const resetFiltersBtn = document.getElementById('reset-filters');
            const applyFiltersBtn = document.getElementById('apply-filters');
                
            let currentPage = 1;
            const projectsPerPage = 9;
            let filteredProjects = [...projects];
                
            // Display projects function
            function displayProjects() {
                projectsContainer.innerHTML = '';
            
                const startIndex = (currentPage - 1) * projectsPerPage;
                const endIndex = startIndex + projectsPerPage;
                const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
            
                if (paginatedProjects.length === 0) {
                    projectsContainer.innerHTML = `
                        <div class="col-span-full text-center py-12">
                            <i class="fas fa-project-diagram text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-600 dark:text-gray-300">No projects found matching your criteria.</p>
                        </div>
                    `;
                    return;
                }
            
                paginatedProjects.forEach(project => {
                    const tagsHTML = project.tags.map(tag => 
                        `<span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">${tag}</span>`
                    ).join('');
                
                    const projectCard = `
                        <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                            <div class="h-48 w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                                <img src="${project.image}" alt="${project.title}" class="object-cover w-full h-full transition-transform duration-300 hover:scale-105">
                            </div>
                            <div class="p-5 flex flex-col flex-1">
                                <h3 class="text-lg font-bold mb-1 text-gray-900 dark:text-white truncate">${project.title}</h3>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">${project.description}</p>
                                <p class="text-xs text-gray-400 dark:text-gray-400 mb-2">${project.date}</p>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    ${tagsHTML}
                                </div>
                                <div class="mt-auto flex gap-2">
                                    <a href="${project.demoLink}" class="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm shadow transition" target="_blank" rel="noopener noreferrer">
                                        <i class="fas fa-play mr-1"></i> Live Demo
                                    </a>
                                    <a href="${project.codeLink}" class="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md font-medium text-sm transition" target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-github mr-1"></i> Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    projectsContainer.innerHTML += projectCard;
                });
            }
        
            // Setup pagination
            function setupPagination() {
                paginationContainer.innerHTML = '';
                const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
            
                if (pageCount <= 1) return;
            
                // Previous button
                if (currentPage > 1) {
                    paginationContainer.innerHTML += `
                        <button onclick="changePage(${currentPage - 1})" class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    `;
                }
            
                // Page numbers
                for (let i = 1; i <= pageCount; i++) {
                    paginationContainer.innerHTML += `
                        <button onclick="changePage(${i})" class="px-3 py-1 ${i === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded">
                            ${i}
                        </button>
                    `;
                }
            
                // Next button
                if (currentPage < pageCount) {
                    paginationContainer.innerHTML += `
                        <button onclick="changePage(${currentPage + 1})" class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    `;
                }
            }
        
            // Change page function
            window.changePage = function(page) {
                currentPage = page;
                displayProjects();
                setupPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        
            // Show search suggestions
            function showSuggestions(term) {
                const suggestions = [];
            
                // Search in titles
                projects.forEach(project => {
                    if (project.title.toLowerCase().includes(term)) {
                        suggestions.push(project.title);
                    }
                });
            
                // Search in types
                projects.forEach(project => {
                    if (project.type.toLowerCase().includes(term)) {
                        suggestions.push(project.type);
                    }
                });
            
                // Search in tags
                projects.forEach(project => {
                    project.tags.forEach(tag => {
                        if (tag.toLowerCase().includes(term)) {
                            suggestions.push(tag);
                        }
                    });
                });
            
                // Remove duplicates
                const uniqueSuggestions = [...new Set(suggestions)];
            
                if (uniqueSuggestions.length > 0) {
                    searchSuggestions.innerHTML = uniqueSuggestions.map(suggestion => 
                        `<div class="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">${suggestion}</div>`
                    ).join('');
                    searchSuggestions.classList.remove('hidden');
                
                    // Add click event to suggestions
                    document.querySelectorAll('#search-suggestions div').forEach(item => {
                        item.addEventListener('click', () => {
                            searchInput.value = item.textContent;
                            searchSuggestions.classList.add('hidden');
                            filterProjects();
                        });
                    });
                } else {
                    searchSuggestions.classList.add('hidden');
                }
            }
        
            // Filter projects based on search
            function filterProjects() {
                const searchTerm = searchInput.value.toLowerCase();
            
                if (searchTerm.length === 0) {
                    filteredProjects = [...projects];
                } else {
                    filteredProjects = projects.filter(project => {
                        return project.title.toLowerCase().includes(searchTerm) ||
                               project.type.toLowerCase().includes(searchTerm) ||
                               project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                               project.description.toLowerCase().includes(searchTerm);
                    });
                }
            
                currentPage = 1;
                displayProjects();
                setupPagination();
            }
        
            // Setup event listeners
            function setupEventListeners() {
                // Search input
                searchInput.addEventListener('input', () => {
                    const searchTerm = searchInput.value.toLowerCase();
                    showSuggestions(searchTerm);
                });
            
                // Filter toggle
                filterToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    filterDropdown.classList.toggle('hidden');
                });
            
                // Prevent filter dropdown from closing when clicking inside
                filterDropdown.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            
                // Close filter dropdown when clicking outside
                document.addEventListener('click', () => {
                    filterDropdown.classList.add('hidden');
                });
            
                // Reset filters
                resetFiltersBtn.addEventListener('click', () => {
                    document.querySelectorAll('#filter-dropdown input[type="checkbox"]').forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    filteredProjects = [...projects];
                    currentPage = 1;
                    displayProjects();
                    setupPagination();
                    filterDropdown.classList.add('hidden'); // Close dropdown after reset
                });
            
                // Apply filters
                applyFiltersBtn.addEventListener('click', () => {
                    const selectedTechs = Array.from(document.querySelectorAll('#filter-dropdown input[type="checkbox"]:checked'))
                        .map(checkbox => checkbox.value);
                
                    filteredProjects = projects.filter(project => {
                        return selectedTechs.length === 0 || selectedTechs.some(tech => project.tags.includes(tech));
                    });
                
                    currentPage = 1;
                    displayProjects();
                    setupPagination();
                    filterDropdown.classList.add('hidden'); // Close dropdown after apply
                });
            }
        
            // Initialize
            setupEventListeners();
            displayProjects();
            setupPagination();
        });