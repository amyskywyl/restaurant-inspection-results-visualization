# restaurant-inspection-results-visualization

### Background

Restaurant's hygene level is really important to people's health, especially for city people who rely on them everyday. Over the past 3 years there has been over 385,000 violations in NYC alone.
This visualization uses data provided by the NYC OpenData to give some insights on the frequency, location and causation of these violations.


### Features  

With this app, users will be able to:
- [ ] Identify locations where better/worse hygene restaurants clustered
- [ ] Differentiate between causations
- [ ] Identify areas where inspection results improved
- [ ] Visualize the general pattern of restaurants inspection grade

### Getting Started

On the left hand side of the screen there is a series of buttons allowing the user to experience the data representation based on various factors. The there are two main modes: a static representation and a dynamic representation, where the data changes over a time frame specified by the control activated.
The different controls are:

#### Wireframes
- [ ] Select year, cusine type, cause of violation on the left
- [ ] Display NYC map on the right with data indicated by heatmap

### Technologies

This project will be implemented with the following technologies:

- `JavaScript` for logic
- `D3.js` with `HTML5` for effects rendering
- `Google Maps API` with `Google Visualization API` for effects rendering

## Implementation Timeline

### Day 1:

- Setup the filestructure and webpack
- Setup google map for NYC

### Day 2:

- Connect the dataset API to Google Map API
- Implement a heatmap for the data points

### Day 3: 

- Add different shapes or colors for different cause of violation and cusine type
- Implement a animation display for a period of time
- Add personal links
