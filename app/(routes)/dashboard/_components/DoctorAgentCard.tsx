import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';

export type doctorAgent = {
  id: number;
  specialist: string;
  image: string;
  description: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired: boolean;
};

type Props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: Props) {
  return (
    <div>
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full h-[250px] object-cover rounded-2xl"
      />
      <h2 className="font-bold text-lg">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 text-sm text-gray-500">{doctorAgent.description}</p>
      <Button className="w-full mt-2">
        Start Consultation <IconArrowRight />
      </Button>
    </div>
  );
}

export default DoctorAgentCard;
