Recommendation System Development Plan

1. Solution Overview

The goal is to build a recommendation system that connects users based on similar preferences and geographical proximity. This will involve a process of data acquisition, feature engineering, and model development.

2. Data Collection

The following key data points will be collected:
User Location: To calculate proximity scores.
Friendship Graph Relations: To analyze the strength of connections within the user network.
Event Interactions: To capture user preferences, including event tags (weighted by interaction type: liking, preferring, or creating events).
3. Feature Extraction

Three primary features will be extracted from the collected data:
Nearby Score: Calculated using PostGIS to determine the geographical distance between users.
Friendship Network Score: Derived from the friendship graph using graph analysis techniques (e.g., PageRank, Louvain, Girvan-Newman) to assess connection strength.
Similarity Score: Computed based on user preferences, event interactions, and tag engagements, utilizing techniques like cosine similarity or Jaccard similarity.
4. Combining Scores and Model Training
Two distinct approaches will be explored for combining the extracted features and training the recommendation model:
4.1. Weighted Sum
Approach: Combine the Nearby, Friendship Network, and Similarity scores using weights determined through experimentation or domain expertise.
Pros:
Preserves information: Weighted sums preserve the magnitude of the differences between users, allowing for more nuanced comparisons.
Flexible and interpretable: Weighted sums are easy to interpret, and the weights can be adjusted based on domain knowledge or feature importance.
Works with small datasets: Weighted sums can be effective even with small datasets, as they don't rely on ranking or comparing users.
Cons:
Sensitive to outliers: Weighted sums can be heavily influenced by outliers in the data, which can skew the results.
Assumes linear relationships: Weighted sums assume linear relationships between features, which may not always hold true.
Requires careful weight selection: The choice of weights can significantly impact the results, and selecting optimal weights can be challenging, especially with limited data.
4.2. Ranking Based Approach
Approach: Train a GBM model using the combined scores as input features.
Pros:
Robust to outliers: Ranking-based approaches are less sensitive to outliers in the data, as they focus on the relative ordering of users rather than the absolute values of the features.
Handles non-linear relationships: Ranking-based approaches can capture non-linear relationships between features, which may not be apparent when using weighted sums.
Easy to implement: Ranking-based approaches are often simple to implement and require minimal computational resources.
Cons:
Loss of information: By converting feature values to ranks, we lose some information about the magnitude of the differences between users.
Ties and collisions: When multiple users have the same rank, it can lead to ties and collisions, which can affect the accuracy of the combined score.
Requires a sufficient number of users: Ranking-based approaches work best when there are many users to rank. With a low amount of data, the rankings may not be reliable.
Analysis:

Considering the limited features and low amount of data, a weighted sum approach might be more suitable. This is because:
Current features (Nearby Score, Friendship Network Score, and Similarity Score) are likely to have different scales and units, making it difficult to compare them directly using ranks.
With a low amount of data, ranking-based approaches may not be reliable, and weighted sums can provide a more robust way to combine the features.
Weighted sums allow me to incorporate domain knowledge and adjust the weights based on feature importance, which can help mitigate the effects of limited data.

5. Model Evaluation

Model performance will be rigorously evaluated using MSE between predicted suggested friendships and actual relationships. I will be sure to create suitable training and testing data to prevent overfitting.

6. Implementation Plan

6.1. Data Collection & Storage
Event Interactions: Add tags to all events and user preferences.
Database Schema: Design a robust database schema to store event tags, user tags, and tag references.
Data Aggregation Script: Implement a Python script to gather all necessary user data from the PostgreSQL database, including social relationships, user location, and preferences.
6.2. Model Training
DataFrame Creation: Consolidate all collected data into a DataFrame.
Model Calculation: Execute calculations to train the model using the Weighted Sum approach.
6.4. Display Suggested Users
Endpoint: Create an endpoint to grab the top 5 most recommended users for a specific user.
User Interface: Grab and display the list of 5 suggested users on the dedicated suggestion page.