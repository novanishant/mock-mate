"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db.js";
import { UserAnswer } from "@/utils/schema.js";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  useEffect(() => {
    GetFeedback();
  }, []);
  const GetFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);
      setFeedbackList(result);
      console.log(result);
      if (result.length > 0) {
        let totalRating = 0;
        for (let i = 0; i < result.length; i++) {
          totalRating += parseInt(result[i].rating);
        }
        const avgRating = totalRating / result.length;

        setAverageRating(avgRating.toFixed(1)); 
      } else {
        setAverageRating(0); 
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };
  const router = useRouter();

  return (
    <div className="p-10 ">
      {feedbackList?.length == 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
        <Image 
        className=""
          src="/no-data.svg"
          width="200"
          height="200"
          alt="no data image"
        />
        <h2 className="text-2xl">No Interview Feedback Record Found</h2>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-blue-600 text-lg my-3">
            Your overall interview rating: <strong>{averageRating*2}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-large my-2 text-left flex justify-between gap-7 w-full">
                  {item.question}
                  <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className=" flex flex-col gap-2">
                    <h2 className="bg-yellow-50 text-yellow-900 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")}> Go Home</Button>
    </div>
  );
}
export default Feedback;
