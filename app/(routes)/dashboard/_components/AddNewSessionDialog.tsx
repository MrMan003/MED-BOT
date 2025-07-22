// File: app/(routes)/dashboard/_components/AddNewSessionDialog.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2 } from "lucide-react";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { doctorAgent } from "./DoctorAgentCard";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | null>(null);
  const router = useRouter();

  const onClickNext = async () => {
    if (!note.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post<doctorAgent[]>("/api/suggest-doctors", { notes: note });
      const doctors = Array.isArray(response.data) ? response.data : [];
      setSuggestedDoctors(doctors);
      console.log("✅ Suggested doctors:", doctors);
    } catch (error) {
      console.error("❌ Failed to fetch doctors:", error);
      alert("Failed to fetch doctors. Check console for details.");
      setSuggestedDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const onStartConversation = async () => {
    if (!note.trim() || !selectedDoctor) return;
    setLoading(true);
    try {
      const result = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor: selectedDoctor,
      });

      const sessionId = result?.data?.sessionId;
      if (sessionId) {
        router.push(`/dashboard/medical-agent/${sessionId}`);
      } else {
        alert("Failed to start session.");
      }
    } catch (error) {
      console.error("❌ Error starting session:", error);
      alert("Error starting the consultation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {suggestedDoctors.length === 0 ? (
              <div>
                <h2 className="text-md font-medium mb-2">Add Symptoms or Any Other Details</h2>
                <Textarea
                  placeholder="Add details here..."
                  className="h-[200px] mt-1"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                />
              </div>
            ) : (
              <div>
                <h2 className="text-md font-medium mb-3">Select the Doctor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {suggestedDoctors.map((doctor, index) => (
                    <SuggestedDoctorCard
                      key={index}
                      doctorAgent={doctor}
                      setSelectedDoctor={() => setSelectedDoctor(doctor)}
                      selectedDoctor={selectedDoctor}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose disabled={loading}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {suggestedDoctors.length === 0 ? (
            <Button disabled={!note.trim() || loading} onClick={onClickNext}>
              Next
              {loading ? <Loader2 className="ml-2 animate-spin" /> : <ArrowRight className="ml-2" />}
            </Button>
          ) : (
            <Button disabled={loading || !selectedDoctor} onClick={onStartConversation}>
              Start Consultation
              {loading ? <Loader2 className="ml-2 animate-spin" /> : <ArrowRight className="ml-2" />}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
