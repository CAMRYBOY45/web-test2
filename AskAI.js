// Ask AI.js

document.getElementById('aiForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Show loading, hide results
  document.getElementById('loading').style.display = 'block';
  document.getElementById('results').style.display = 'none';
  document.getElementById('submitBtn').disabled = true;
  
  // Get form values
  const occasion = document.getElementById('occasion').value;
  const style = document.getElementById('style').value;
  const weather = document.getElementById('weather').value;
  const colors = document.getElementById('colors').value;
  const additionalInfo = document.getElementById('additional-info').value;
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate mock outfit recommendations
  const outfits = generateOutfits(occasion, style, weather, colors, additionalInfo);
  
  // Display results
  displayOutfits(outfits);
  
  // Hide loading, show results
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  document.getElementById('submitBtn').disabled = false;
});

function generateOutfits(occasion, style, weather, colors, additionalInfo) {
  // In a real app, this would call an actual AI API
  // Here we'll generate mock recommendations based on inputs
  
  const baseOutfits = [
    {
      name: "Classic Casual",
      description: "Perfect for everyday wear with a touch of elegance",
      items: ["White t-shirt", "Dark jeans", "White sneakers", "Minimalist watch"],
      tags: ["casual", "minimalist", "versatile"]
    },
    {
      name: "Streetwear Edge",
      description: "Bold urban look with contemporary pieces",
      items: ["Oversized hoodie", "Cargo pants", "High-top sneakers", "Bucket hat"],
      tags: ["streetwear", "urban", "trendy"]
    },
    {
      name: "Smart Casual",
      description: "Polished yet comfortable for semi-formal occasions",
      items: ["Button-down shirt", "Chinos", "Loafers", "Structured jacket"],
      tags: ["work", "date", "smart"]
    },
    {
      name: "Bohemian Flair",
      description: "Free-spirited look with flowing layers",
      items: ["Embroidered blouse", "Flowy midi skirt", "Leather sandals", "Statement necklace"],
      tags: ["bohemian", "festival", "colorful"]
    },
    {
      name: "Athleisure Set",
      description: "Sporty yet stylish for active days",
      items: ["Performance t-shirt", "Joggers", "Running shoes", "Sports watch"],
      tags: ["sporty", "comfortable", "active"]
    },
    {
      name: "Formal Elegance",
      description: "Sophisticated look for special occasions",
      items: ["Tailored suit", "Dress shirt", "Oxford shoes", "Silk tie"],
      tags: ["formal", "wedding", "business"]
    }
  ];
  
  // Filter outfits based on user preferences
  let filteredOutfits = [...baseOutfits];
  
  if (occasion) {
    filteredOutfits = filteredOutfits.filter(outfit => 
      outfit.tags.some(tag => 
        (occasion === 'casual' && ['casual', 'versatile'].includes(tag)) ||
        (occasion === 'work' && ['work', 'smart'].includes(tag)) ||
        (occasion === 'date' && ['date', 'smart'].includes(tag)) ||
        (occasion === 'party' && ['trendy', 'urban'].includes(tag)) ||
        (occasion === 'wedding' && ['formal', 'business'].includes(tag)) ||
        (occasion === 'sports' && ['sporty', 'active'].includes(tag))
      )
    );
  }
  
  if (style) {
    filteredOutfits = filteredOutfits.filter(outfit => 
      outfit.tags.includes(style) || 
      (style === 'minimalist' && outfit.tags.includes('versatile')) ||
      (style === 'trendy' && outfit.tags.includes('urban'))
    );
  }
  
  // Add color information to the outfits
  if (colors) {
    filteredOutfits = filteredOutfits.map(outfit => ({
      ...outfit,
      name: `${colors.split(',')[0].trim()} ${outfit.name}`,
      description: `${outfit.description} featuring ${colors}`
    }));
  }
  
  // Limit to 4 outfits for display
  return filteredOutfits.slice(0, 4);
}

function displayOutfits(outfits) {
  const outfitGrid = document.getElementById('outfitGrid');
  outfitGrid.innerHTML = '';
  
  if (outfits.length === 0) {
    outfitGrid.innerHTML = '<p>No outfits match your criteria. Try broadening your preferences.</p>';
    return;
  }
  
  outfits.forEach(outfit => {
    const outfitCard = document.createElement('div');
    outfitCard.className = 'outfit-card';
    
    // Generate a placeholder image URL based on outfit name
    const outfitNameForImage = outfit.name.toLowerCase().replace(/ /g, '-');
    const imageUrl = `https://via.placeholder.com/300x300?text=${encodeURIComponent(outfit.name)}`;
    
    outfitCard.innerHTML = `
      <div class="outfit-img">
        <img src="${imageUrl}" alt="${outfit.name}">
      </div>
      <div class="outfit-details">
        <h4>${outfit.name}</h4>
        <p>${outfit.description}</p>
        <p><strong>Includes:</strong> ${outfit.items.join(', ')}</p>
        <div class="outfit-tags">
          ${outfit.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
      </div>
    `;
    
    outfitGrid.appendChild(outfitCard);
  });
}
  