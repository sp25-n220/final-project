## Final Project

### Project Summary

Our final project will focus on festivals, specifically festivals held in the U.S. The reason for us choosing this topic is because we find Midwest celebrations interesting and want to highlight just how great they truly are! The 4 of us, Kiersten, Elias, Haven, and myself will be working together in order to display a wide range of festivals. We will use CRUD techniques with a sqlite database in order for user's to have an interactive experience. As of right now, some of our main page flow will take the user on a journey throughout specific festivals and by the end of that experience hopefully, learn about midwest festivals and also maybe purchase tickets of these festivals!  

### Live Link

[Home Page](https://url.com)

### Key Takeaways

Understanding of why we are doing this project

### Core Webpages

List core webpages and briefly describe the page of them

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
  - Hero Section with Featured Next Upcoming Festival:
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
  - id | INT (PK) | Unique identifier for each festival
  - name | VARCHAR | Name of the festival
  - location | VARCHAR | City, State
  - category | VARCHAR | Type of festival (Music, Food, Cultural...)
  - start_date | DATE | Festival start date
  - end_date | DATE | Festival end date
  - description | TEXT | Festival overview
  - image_url | VARCHAR | Path to featured image
  - website_link | VARCHAR | External or internal festival page link

**Rationale:**
The table supports scalable and dynamic rendering of each festival, allowing for easy filtering and visual presentation across category pages. It also supports consistent color tagging or styling based on festival category.

### Members & Responsibilities

List all members and their roles

Elias Arriaga  

Joseph Roper - 

Kiersten Foulk 
