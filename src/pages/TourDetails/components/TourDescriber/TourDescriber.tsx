import { Card, CardBody } from "@heroui/react";

interface TourProps {
  description?: string;
}

export const TourDescriber = ({ description }: TourProps) => {
  const defaultDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  
  return (
    <Card className="TourDescriber">
      <CardBody>
        <div className="flex w-full flex-col">
          <div className="TourDescriber-descr">
            <h2 className="text-xl font-semibold mb-4">Опис</h2>
            <p className="text-gray-700">
              {description || defaultDesc}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};