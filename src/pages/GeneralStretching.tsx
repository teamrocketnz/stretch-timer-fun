import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, SkipForward, SkipBack } from "lucide-react";
import Timer from "@/components/Timer";
import ExerciseDisplay from "@/components/ExerciseDisplay";
import { generalStretchingExercises } from "@/data/generalStretchingExercises";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const GeneralStretching = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  console.log('Current exercises:', generalStretchingExercises);
  console.log('Current index:', currentExerciseIndex);
  console.log('Current exercise:', generalStretchingExercises[currentExerciseIndex]);

  const handleNext = useCallback(() => {
    if (!generalStretchingExercises || generalStretchingExercises.length === 0) {
      toast({
        title: "No exercises available",
        description: "Please check the exercises configuration.",
        variant: "destructive",
      });
      return;
    }

    setCurrentExerciseIndex((prev) => 
      prev === generalStretchingExercises.length - 1 ? 0 : prev + 1
    );
    setIsPlaying(true);
  }, [toast]);

  const handlePrevious = useCallback(() => {
    if (!generalStretchingExercises || generalStretchingExercises.length === 0) {
      toast({
        title: "No exercises available",
        description: "Please check the exercises configuration.",
        variant: "destructive",
      });
      return;
    }

    setCurrentExerciseIndex((prev) => 
      prev === 0 ? generalStretchingExercises.length - 1 : prev - 1
    );
    setIsPlaying(true);
  }, [toast]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleTimerComplete = useCallback(() => {
    handleNext();
  }, [handleNext]);

  if (!generalStretchingExercises || generalStretchingExercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-6">
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <p className="text-center text-white">No exercises available</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          General Stretching Exercises
        </h1>
        
        <div className="bg-white rounded-lg p-6 shadow-xl space-y-6">
          <div className="text-center text-sm text-gray-600">
            Exercise {currentExerciseIndex + 1} of {generalStretchingExercises.length}
          </div>
          
          <ExerciseDisplay exercise={generalStretchingExercises[currentExerciseIndex]} />
          
          <Timer 
            duration={60} 
            isPlaying={isPlaying} 
            onComplete={handleTimerComplete}
          />
          
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={handlePrevious}>
              <SkipBack className="h-6 w-6" />
            </Button>
            
            <Button onClick={togglePlay}>
              {isPlaying ? (
                <PauseCircle className="h-6 w-6" />
              ) : (
                <PlayCircle className="h-6 w-6" />
              )}
            </Button>
            
            <Button variant="outline" onClick={handleNext}>
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralStretching;