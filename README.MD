## Final Project

### Project Summary

Our final project will focus on festivals, specifically festivals held in the U.S. The reason for us choosing this topic is because we find Midwest celebrations interesting and want to highlight just how great they truly are! The 4 of us, Kiersten, Elias, Haven, and myself will be working together in order to display a wide range of festivals. We will use CRUD techniques with a sqlite database in order for user's to have an interactive experience. As of right now, some of our main page flow will take the user on a journey throughout specific festivals and by the end of that experience hopefully, learn about midwest festivals and also maybe purchase tickets of these festivals!  

### Live Link

[Home Page](https://url.com)

### Key Takeaways

Understanding of why we are doing this project

### Core Webpages

Login/Signup: This page will be for users who either A. have an account, or B. need to signup. This will also be the first page that shows and will also show if a user chooses to logout. 

Joseph Roper Lollapalooza: 
1. For my first page I will walk through Lollapalooza. I will describe what it is, give an overview, and possibly this year's artists involved! There will be pictures for user's too look at as well as videos (if I get that working.) 
2. For my second page this is where my user's will be able to interact with the webpage. Specifically, this will have the CRUD features. 
    Features include:
    - Create a schedule for a trip and view that schedule. (Create and Read)
    - Purchase tickets (simulated database) (Delete)
    - Change any scheduling in order to get the best Lolla experience (Update)

**Kiersten Foulk Bonnaroo:**



### Design Choices

#### Color Pallette "Sunset Groove": 
  - **Sunset Orange** | #FF5E3A | Used for headers, call-to-action buttons, and highlights – brings bold energy.
  - **Golden Amber** | #FFB300 | Accent for hover states, icons, and festival badges – adds warmth and excitement.
  - **Coral Glow** | #FF6F61 | Section backgrounds or highlight areas – gives a playful and friendly touch.
  - **Sky Blue** | #4A90E2 | For links, secondary buttons, and dividers – cool contrast to the warm hues.
  - **Warm Sand** | #FFF8F0 | Neutral background for readability – keeps the layout clean and inviting.

**Rationale:**
This palette evokes a vibrant, energetic summer festival vibe, ideal for visually immersing users in the feeling of a sunset-lit stage. The warm tones pull users in, while cooler elements like Sky Blue balance it out and guide navigation.

#### Layout:
  - Hero Section with Featured Next Upcoming Festivals:
A full-width banner showcases a rotating carousel of top festivals with dates, locations, and an immediate “Learn More” button.

  - Sticky Navigation Bar:
Users can jump to sections like Music, Food, Cultural, and Seasonal festivals easily from anywhere on the page.

  - Category Cards Grid:
A responsive card layout helps users browse different types of festivals, each card linking to a dedicated detail page.

  - Interactive Map Preview:
A simplified U.S. map highlights festival regions. Hovering reveals festival names, and clicking opens specific location-based info.

  - Mobile-First Design:
Layout stacks vertically on smaller screens with collapsible menus and swipeable carousels for an intuitive mobile experience. (Bootstrap)

#### Database Table Design
Table: **festivals**
- id | INT (PK) | Unique identifier for each festival
- name | VARCHAR | Name of the festival
- location | VARCHAR | City, State
- category | VARCHAR | Type of festival (Music, Food, Cultural...)
- start_date | DATE | Festival start date
- end_date | DATE | Festival end date
- description | TEXT | Festival overview
- image_url | VARCHAR | Path to featured image
- website_link | VARCHAR | External or internal festival page link

Table: **ticket_orders**
- order_id | INT (PK) | Unique identifier for each order
- festival_id | INT (FK) | References festivals.id to link to the associated festival
- user_name | VARCHAR | Name of the user placing the order
- user_email | VARCHAR | Email of the user for order confirmation display
- ticket_quantity | INT | Number of tickets ordered
- ticket_type | VARCHAR | Type of ticket (e.g., "General Admission", "VIP")
- price | DECIMAL(10,2) | Price per ticket (can be used to calculate total cost)
- order_date | DATETIME | Timestamp of when the order was placed
- status | VARCHAR | Order status (e.g., "confirmed", "pending", "canceled")
- confirmation_code | VARCHAR | Unique string for each order (e.g., "CONF-INDYJAZZ-2025-ABC123")

**Rationale:**
The tables support scalable and dynamic rendering of each festival and ticket purchase, allowing for easy filtering and visual presentation across category pages and confirmations upon purchase. It also supports consistent color tagging or styling based on festival category.

### Members & Responsibilities

List all members and their roles

Elias Arriaga - Analyist 

Joseph Roper - President

Haven Hamelin - Scrum Master

Kieren Foulk - Designer
