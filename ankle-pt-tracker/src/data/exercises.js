export const exerciseProgram = {
  daily: {
    title: "DAILY (5–7 min) — Joint awareness",
    note: "Do this barefoot at home.",
    exercises: [
      {
        id: "daily-1",
        name: "Single-leg balance",
        details: "45–60s per side",
        cues: [
          "Soft knee (never locked)",
          "Imagine your knee floating over the middle toes"
        ]
      },
      {
        id: "daily-2",
        name: "Balance with movement",
        details: "30s per side",
        description: "While balancing, slowly: Rotate head, Reach arms",
        cues: []
      }
    ],
    goal: "Train ankle + knee + brain together"
  },

  mondayWednesdayFriday: {
    title: "MON / WED / FRI (15–20 min) — Stability + reaction",
    note: "This is your core work.",
    exercises: [
      {
        id: "mwf-1",
        name: "Fast ankle eversion",
        tag: "key exercise",
        details: "3 × 12 per side",
        description: "Resistance band • Fast out, slow return",
        cues: ["Snap the foot outward before it rolls"]
      },
      {
        id: "mwf-2",
        name: "Step-down control",
        tag: "anti-hyperextension",
        details: "2–3 × 8 per side",
        description: "Step off a low stair • Land with: Slight knee bend • Heel → midfoot → toe",
        cues: ["Absorb, don't lock"]
      },
      {
        id: "mwf-3",
        name: "Lateral control",
        tag: "golf-relevant",
        details: "2 × 30s per side",
        description: "Option 1 (beginner): Side step → stick the landing\nOption 2 (progression): Small side hops",
        cues: ["Knee soft, ankle stacked under you"]
      }
    ]
  },

  tuesdayThursday: {
    title: "TUE / THU (5–10 min) — Knee + chain protection",
    note: "This is specifically for hyperextension.",
    exercises: [
      {
        id: "tt-1",
        name: "Mini-squat holds",
        details: "3 reps • 20–30s hold",
        description: "Knees slightly bent • Weight midfoot",
        cues: []
      },
      {
        id: "tt-2",
        name: "Single-leg Romanian deadlift",
        tag: "bodyweight",
        details: "2 × 6–8 per side",
        description: "Slow hinge",
        cues: ["Hamstrings on, knee unlocked"]
      }
    ]
  }
};

// Helper function to get exercises for a specific day
export const getExercisesForDay = (dayOfWeek) => {
  // dayOfWeek: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const exercises = [];

  // Daily exercises (every day)
  exercises.push({
    section: "daily",
    ...exerciseProgram.daily
  });

  // Monday, Wednesday, Friday
  if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
    exercises.push({
      section: "mondayWednesdayFriday",
      ...exerciseProgram.mondayWednesdayFriday
    });
  }

  // Tuesday, Thursday
  if (dayOfWeek === 2 || dayOfWeek === 4) {
    exercises.push({
      section: "tuesdayThursday",
      ...exerciseProgram.tuesdayThursday
    });
  }

  return exercises;
};

// Helper to get all exercise IDs for a given day
export const getAllExerciseIdsForDay = (dayOfWeek) => {
  const sections = getExercisesForDay(dayOfWeek);
  return sections.flatMap(section =>
    section.exercises.map(exercise => exercise.id)
  );
};
