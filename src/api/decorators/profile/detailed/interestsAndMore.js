const defaultEntries = ['Will tell you later', 'Enjoy most forms of music', 'Not too keen on music',  //eslint-disable-line
  'Love reading almost anything', 'Not much of a reader', 'Love all kinds of movies', //eslint-disable-line
  'Not a movie buff', 'Not a sportsperson', 'Anything edible is great!', 'Not much of a food-lover']; //eslint-disable-line

const interestsAndHobbies = {
  'Alternative healing': null,
  'Animal breeding': null,
  'Astrology / Palmistry / Numerology': 'Astrology',
  Astronomy: null,
  'Bird watching': null,
  'DIY(do it yourself) projects': null,
  Fishing: null,
  Graphology: null,
  'Ham radio': null,
  Photography: null,
  Technology: null,
  'Museums / Galleries / Exhibitions': 'Museums',
  'Model building': null,
  'Volunteering / Social Service': 'Social Service',
  'Wine tasting': null,
  Acting: null,
  'Art / Handicraft': 'Handicraft',
  Dancing: null,
  'Film-making': null,
  Theatre: null,
  Singing: null,
  'Playing musical instruments': null,
  'Painting / Drawing': 'Painting',
  Blogging: null,
  'Learning new languages': null,
  Writing: null,
  'Home / Interior decoration': 'Interior decoration',
  Stitching: null,
  'Mehendi Designing': null,
  'Bikes / Cars': 'Automobiles',
  Clubbing: null,
  'Hiking / Camping': 'Hiking',
  Hunting: null,
  'Trekking / Adventure sports': 'Adventure Sports',
  'Sports - Outdoor': 'Outdoor Sports',
  'Yoga / Meditation': 'Yoga',
  Collectibles: null,
  'Sports - Indoor': 'Indoor Sports',
  'Solving Crosswords, Puzzles': null,
  Driving: null,
  'Eating out': null,
  'Gardening / Landscaping': 'Gardening',
  Politics: null,
  'Travel / Sightseeing': 'Travelling',
  Movies: null,
  Religion: null,
  'Reading / Book clubs': 'Reading',
  Shopping: null,
  Pets: null,
  'Net surfing': null,
  Nature: null,
  'Listening to music': null,
  'Health & Fitness': null,
  'Video / Computer games': 'Computer games',
  'Watching television': null,
  Cooking: null,
};

const cuisinesHash = {
  American: null,
  Arabic: null,
  Bengali: null,
  Chinese: null,
  Continental: null,
  'Fast food': null,
  Gujarati: null,
  Italian: null,
  Japanese: null,
  Konkan: null,
  Lebanese: null,
  Mexican: null,
  Moghlai: null,
  'North Indian': null,
  Persian: null,
  Punjabi: null,
  Rajasthani: null,
  Seafood: null,
  Sindhi: null,
  'Soul Food': 'Soul',
  'South Indian': null,
  Spanish: null,
  Thai: null,
};

const booksHash = {
  Biographies: null,
  'Business / Occupational': 'Business books',
  'Classic literature': null,
  Comics: null,
  Fantasy: 'Fantasy books',
  History: null,
  Humour: 'Humour books',
  'Magazines & Newspapers': null,
  'Philosophy / Spiritual': 'Philosophy books',
  Poetry: null,
  Romance: 'Romantic books',
  'Science Fiction': 'Science Fiction books',
  'Self-help': 'Self-help books',
  'Short stories': null,
  'Thriller / Suspense': 'Thriller books',
};

const moviesHash = {
  'Action / Suspense': 'Action',
  Classics: null,
  Comedy: null,
  Documentaries: null,
  Drama: 'Drama films',
  Epics: 'Epic films',
  Horror: null,
  'Non-commercial / Art': null,
  Romantic: null,
  'Sci-Fi & Fantasy': null,
  'Short films': null,
  'World cinema': null,
};

const sportsHash = {
  Aerobics: null,
  Athletics: null,
  Badminton: null,
  Baseball: null,
  Basketball: null,
  'Billiards / Snooker / Pool': 'Billiard Sports',
  Bowling: null,
  'Boxing / Wrestling': 'Boxing',
  'Card games': null,
  Carrom: null,
  Chess: null,
  Cricket: null,
  Cycling: null,
  'Football / Soccer': 'Football',
  Golf: null,
  'Gym workouts / Weight training': 'Working out',
  Hockey: null,
  'Horseback Riding': null,
  'Jogging / Walking / Running': 'Cardio Workouts',
  'Martial Arts': null,
  'Motor Racing': null,
  Polo: null,
  Rugby: null,
  'Sailing / Boating / Rowing': 'Sailing',
  Scrabble: null,
  'Scuba Diving': null,
  Shooting: 'Shooting Sports',
  'Skating / Snowboarding / Skiing': 'Winter Sports',
  Squash: null,
  'Swimming / Water sports': 'Water Sports',
  'Table-tennis': null,
  Tennis: null,
  'Trekking / Adventure sports': 'Adventure Sports',
  Volleyball: null,
  'Weight training': null,
  'Winter / Rink sports': 'Winter Sports',
  'Yoga / Meditation': 'Yoga',
};

const musicHash = {
  'Acid Rock / Hard Rock': 'Hard Rock',
  'Alternative Music': null,
  'Bhajans / Devotional': 'Devotional Songs',
  Bhangra: 'Bhangra Music',
  Blues: null,
  'Christian / Gospel / Blue Grass': 'Gospel Music',
  'Classical - Carnatic': 'Carnatic Music',
  'Classical - Hindustani': 'Hindustani Music',
  'Classical - Opera': 'Opera',
  'Classical - Western': 'Western Classical Music',
  'Country Music': null,
  Disco: null,
  Folk: 'Folk Music',
  Ghazals: null,
  'Heavy Metal': null,
  'Hip-Hop': null,
  'House Music': null,
  Indipop: null,
  'Instrumental - Indian': 'Indian Instrumentals',
  'Instrumental - Western': 'Western Instrumentals',
  Jazz: null,
  'Latest film songs': 'Film Music',
  'Latin Music': null,
  'New Age Music': null,
  'Old film songs': null,
  Pop: 'Pop Music',
  Qawalis: null,
  'R&B / Soul': 'Rhythm & Blues',
  Rap: 'Rap Music',
  Reggae: null,
  Remixes: null,
  'Soft Rock': null,
  'Sufi music': null,
  'Techno / Trance': 'Techno Music',
  'Western Country Music': 'Country Music',
  'World Music': null,
};

const dressStyleHash = {
  'Business casual - semi-formal office wear': 'Business casual - semi-formal office wear',
  'Casual - usually in jeans and T-shirts': 'Casual - usually in jeans and T-shirts',
  'Classic Indian - typically Indian formal wear': 'Classic Indian - typically Indian formal wear',
  'Classic Western - typically western formal wear': 'Classic Western - typically western formal wear',
  'Designer - only leading brands will do': 'Designer - only leading brands will do',
  'Trendy - in line with the latest fashion': 'Trendy - in line with the latest fashion',
};

const prepareList = (base, hash) =>
  // eslint-disable-next-line
  base.filter(key => key !== 'null' && key !== null && !defaultEntries.includes(key))
    .map(key => hash[key] || key);

export default payload => {
  const { hobbies, interests, cuisine, reads, sports, movies, music, dress_style } = payload.interests_and_more;

  const state = {
    hobbies: prepareList([...hobbies, ...interests], interestsAndHobbies),
    cuisines: prepareList(cuisine, cuisinesHash),
    books: prepareList(reads, booksHash),
    sports: prepareList(sports, sportsHash),
    movies: prepareList(movies, moviesHash),
    music: prepareList(music, musicHash),
    dressStyle: prepareList(dress_style, dressStyleHash),
  };

  Object.keys(state).map((key) => { //eslint-disable-line
    const list = state[key];
    if (!list.length) {
      delete state[key];
    }
  });
  return state;
};
