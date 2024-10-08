// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];


function getLearnerData(course, ag, submissions) {
    
    const results = {};

    //debugger;
    //This loop check all students submissions
    for (let i = 0; i < submissions.length; i++) {
        const submission = submissions[i];
        let assignment = null;

        //This loop find the assignment by id
        for (let j = 0; j < AssignmentGroup.assignments.length; j++) {
            if (AssignmentGroup.assignments[j].id === submission.assignment_id) {
                assignment = AssignmentGroup.assignments[j];
                break;
            }
        }

        //Skip if assignment is not found or has no points
        if (!assignment || assignment.points_possible <= 0) {
            continue;
        }

        //Create variable to save data
        const score = submission.submission.score;
        const dueAt = new Date(assignment.due_at);
        const submittedAt = new Date(submission.submission.submitted_at);

        //Validate score
        if (typeof score !== 'number' || isNaN(score)) {
            continue;
        }

        let adjustedScore = score;

        //Deduct points if late
        if (submittedAt > dueAt) {
            adjustedScore *= 0.10; 
        }

        const percent = adjustedScore / assignment.points_possible;

        //Initialize learner data if not exists
        if (!results[submission.learner_id]) {
            results[submission.learner_id] = { id: submission.learner_id, avg: 0, assignments: {}, count: 0 };
        }

        //Add percent to avg
        results[submission.learner_id].avg += percent;

        //Store percent for assignment
        results[submission.learner_id].assignments[assignment.id] = percent *100;

        //Count assignments
        results[submission.learner_id].count++; 
    }

    //This loop calculate the final average for each learner
    for (const learnerId in results) {
        //Average out
        results[learnerId].avg /= results[learnerId].count; 
    }

    //Save all results to array
    return Object.values(results);
}

const result = getLearnerData(CourseInfo.id, AssignmentGroup.id, LearnerSubmissions);

console.log(result);
