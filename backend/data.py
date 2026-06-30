PROFILE = {
    "name": "Chengran Xu",
    "affiliation": "CS & IS\nUniversity of Wisconsin-Madison",
    "location": "Madison, Wisconsin",
    "email": "xuchengran2004@gmail.com",
    "portrait": "/assets/images/homepage/me.png",
    "bio": [
        "Hi, I'm Chengran! I'm an undergrad at the University of Wisconsin-Madison studying Computer Science and Information Science. I previously studied Industrial Design, which continues to shape the way I approach technology, creativity, and user-centered problem solving.",
        "I'm especially interested in human-computer interaction (HCI), Human-AI Interaction (HAI), and intelligent technologies, particularly how emerging technologies influence human behavior and everyday experiences.",
        "At UW-Madison, I am a research assistant at the People and Robots Lab building interactive systems through the Quest for Intelligence initiative, exploring the relationship between people, AI, and future interfaces.",
        "Beyond research, I have also gained industry experience through software engineering and data science internships at Siemens, where I worked on technical development, automation workflows, and data-driven projects.",
        "Outside of academics, I enjoy working out, snow skiing in winter times, and exploring the beauty around Madison.",
    ],
    "interests": [
        {"label": "Research", "value": "HCI, Human-AI Interaction, human-robot service interaction"},
        {"label": "Methods", "value": "Interactive systems, prototyping, product design, user-centered inquiry"},
        {"label": "Applications", "value": "Future interfaces, intelligent tools, everyday technology and behavior"},
    ],
    "links": [
        {"label": "Madison, Wisconsin", "href": "#", "icon": "/assets/icons/location-dot-solid.svg"},
        {"label": "UW-Madison", "href": "https://www.wisc.edu/", "icon": "/assets/icons/university-solid.svg", "external": True},
        {"label": "Email", "href": "mailto:xuchengran2004@gmail.com", "icon": "/assets/icons/envelope-solid-full.svg"},
        {"label": "Google Scholar", "href": "https://scholar.google.com/", "icon": "/assets/icons/google-scholar-brands-solid-full.svg", "external": True},
        {"label": "GitHub", "href": "https://github.com/Luc4xz", "icon": "/assets/icons/github-brands-solid-full.svg", "external": True},
        {"label": "LinkedIn", "href": "https://www.linkedin.com/in/cxu429", "icon": "/assets/icons/linkedin-brands-solid-full.svg", "external": True},
        {"label": "X", "href": "https://x.com/Lucasxuors0", "icon": "/assets/icons/x-twitter-brands-solid-full.svg", "external": True},
    ],
}

PROJECTS = [
    {
        "id": "live-streaming-assistant",
        "title": "Live-Streaming Assistant",
        "kicker": "Concept design, human-AI interaction, product design, prototyping",
        "byline": "Chengran Xu",
        "description": "An AI-assisted livestreaming companion system that uses real-time audience analysis, facial and voice monitoring, and foot-controlled interaction to help streamers reduce cognitive pressure and respond naturally during live performance.",
        "image": "/assets/images/homepage/project1.png",
        "imageAlt": "Live-Streaming Assistant",
        "categories": ["AI", "Human-Computer Interaction", "Research"],
        "technologies": ["AI", "Product Design", "Audience Analysis", "Voice Monitoring", "Prototyping"],
        "detail": [
            "The product combines a camera with display stand, a pressure-sensitive footpad, microphone input, LED reminders, and AI analysis to help streamers manage audience interaction without breaking their performance flow.",
            "The system includes a facial recognition camera, OLED feedback display, microphone, LED reminder strip, and a pressure-sensitive footpad interface.",
            "A key interaction feature is the foot-controlled pad, which allows streamers to trigger quick actions without breaking eye contact with the camera.",
            "The final concept positions AI as a quiet support layer that improves control, awareness, and confidence while preserving authenticity and personal expression.",
        ],
    },
    {
        "id": "urban-halo",
        "title": "Urban Halo",
        "kicker": "LLM-powered system, human-AI interaction, industrial design",
        "byline": "Chengran Xu",
        "description": "A self-guided drone system designed to enhance the efficiency of traffic surveillance and management in urban environments, providing real-time data and insights to city planners and traffic authorities.",
        "image": "/assets/images/homepage/project2.png",
        "imageAlt": "Urban Halo",
        "categories": ["AI", "Human-Computer Interaction", "Data Visualization", "Research"],
        "technologies": ["LLM", "Computer Vision", "Autonomous Systems", "Urban Computing", "Industrial Design"],
        "detail": [
            "Urban Halo proposes an AI-powered autonomous traffic drone system embedded directly into city infrastructure.",
            "Drones are stored inside modified traffic lights or urban utility structures positioned across the city.",
            "The drone collects visual, spatial, and environmental information in real time, then supports responders with structured observations.",
            "The project reframes emergency response from reactive arrival to predictive situational awareness.",
        ],
    },
]

RESEARCH = [
    {
        "id": "people-robots-lab",
        "role": "Research Assistant, People and Robots Lab",
        "title": "Human-Robot Service Interaction Research",
        "byline": "Chengran Xu, supervised by Prof. Bilge Mutlu and Jungeun Lim",
        "image": "/assets/images/homepage/research1.png",
        "imageAlt": "People and Robots Lab research preview",
        "url": "https://peopleandrobots.wisc.edu/",
        "technologies": ["Temi SDK", "Kotlin", "Android Studio", "HRI", "Experiment Design"],
        "bullets": [
            "Developed and evaluated an autonomous human-robot interaction system using the Temi SDK, Kotlin, and Android Studio for service-delivery experiments.",
            "Engineered robot navigation workflows and spatial mapping for the entire first floor of Morgridge Hall, enabling autonomous localization, routing, and multi-point task execution.",
            "Assisted with behavioral experiment design, participant data collection, and interaction scenario analysis.",
        ],
    }
]

EXPERIENCE = [
    {
        "id": "siemens-software",
        "organization": "Siemens",
        "role": "Software Engineering Intern",
        "location": "Industry experience",
        "period": "Recent",
        "technologies": ["Automation", "Software Engineering", "Workflow Tools"],
        "bullets": [
            "Worked on technical development and automation workflows in an industry engineering environment.",
            "Collaborated on software tooling that improved repeatable internal processes.",
        ],
    },
    {
        "id": "siemens-data",
        "organization": "Siemens",
        "role": "Data Science Intern",
        "location": "Industry experience",
        "period": "Recent",
        "technologies": ["Python", "Data Analysis", "Visualization"],
        "bullets": [
            "Supported data-driven projects by organizing, analyzing, and communicating technical information.",
            "Applied computational methods to explore patterns and operational insights.",
        ],
    },
]

EDUCATION = [
    {
        "id": "uw-madison",
        "institution": "University of Wisconsin-Madison",
        "degree": "B.S. Computer Sciences and B.S. Information Science",
        "period": "Undergraduate",
        "details": ["Human-computer interaction", "Human-AI interaction", "Interactive systems", "Product-centered technical development"],
    },
    {
        "id": "industrial-design",
        "institution": "Industrial Design Background",
        "degree": "Prior study in industrial design",
        "period": "Before UW-Madison",
        "details": ["Design thinking", "Human-centered problem solving", "Physical and digital prototyping"],
    },
]

SKILLS = [
    {"id": "programming", "label": "Programming", "skills": ["Java", "Python", "TypeScript", "Kotlin", "React"]},
    {"id": "research-methods", "label": "Research Methods", "skills": ["HCI", "HAI", "Experiment Design", "Participant Studies", "Interaction Analysis"]},
    {"id": "systems", "label": "Systems", "skills": ["Android Studio", "Temi SDK", "REST APIs", "Flask", "D3.js"]},
    {"id": "design", "label": "Design", "skills": ["Product Design", "Industrial Design", "Prototyping", "User-Centered Inquiry"]},
]

JOURNEY = {
    "nodes": [
        {"id": "industrial-design", "label": "Industrial Design", "group": "Education", "year": 2022},
        {"id": "uw-madison", "label": "UW-Madison CS & IS", "group": "Education", "year": 2024},
        {"id": "java", "label": "Java", "group": "Skill", "year": 2024},
        {"id": "python", "label": "Python", "group": "Skill", "year": 2025},
        {"id": "siemens", "label": "Siemens Internships", "group": "Industry", "year": 2025},
        {"id": "hci", "label": "HCI / HAI", "group": "Skill", "year": 2025},
        {"id": "people-robots", "label": "People and Robots Lab", "group": "Research", "year": 2026},
        {"id": "livestream", "label": "Live-Streaming Assistant", "group": "Project", "year": 2026},
        {"id": "urban-halo", "label": "Urban Halo", "group": "Project", "year": 2026},
    ],
    "links": [
        {"source": "industrial-design", "target": "uw-madison", "strength": 1},
        {"source": "uw-madison", "target": "java", "strength": 1},
        {"source": "uw-madison", "target": "python", "strength": 1},
        {"source": "python", "target": "siemens", "strength": 1},
        {"source": "uw-madison", "target": "hci", "strength": 1},
        {"source": "hci", "target": "people-robots", "strength": 1},
        {"source": "hci", "target": "livestream", "strength": 1},
        {"source": "hci", "target": "urban-halo", "strength": 1},
        {"source": "python", "target": "urban-halo", "strength": 0.7},
    ],
}
