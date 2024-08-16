const { id } = useParams<{ id: string }>();

const {
  data: userDetails,
  isLoading,
  error,
} = useQuery({
  queryKey: ["user", id],
  queryFn: () => userService.readUser(id),
  enabled: !!id,
});
import { useQuery } from "@tanstack/react-query";
import { Text, Group, Title, Divider, Button } from "@mantine/core";
import userService from "@/services/userService";
import { Link, useParams } from "react-router-dom";

export default function UserProfile() {
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading profile</Text>;
  }

  return (
    <div>
      {userDetails?.public ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Title order={2}>{userDetails.alias}'s User Profile</Title>
          </div>
          <Divider />

          <Group>
            <Text w={500}>Alias:</Text>
            <Text>{userDetails.alias || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Email:</Text>
            <Text>{userDetails.email}</Text>
          </Group>

          <Group>
            <Text w={500}>Green Card:</Text>
            <Text>{userDetails.greenCard ? "Yes" : "No"}</Text>
          </Group>

          <Group>
            <Text w={500}>Step 2 CS Pathway:</Text>
            <Text>{userDetails.step2CSPathway || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Year of Graduation:</Text>
            <Text>{userDetails.yearOfGraduation || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Months of USCE:</Text>
            <Text>{userDetails.monthsOfUSCE || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>ECFMG Certified:</Text>
            <Text>{userDetails.ecfmgCertified ? "Yes" : "No"}</Text>
          </Group>

          <Group>
            <Text w={500}>Visa Required:</Text>
            <Text>{userDetails.visaRequired ? "Yes" : "No"}</Text>
          </Group>

          <Group>
            <Text w={500}>Graduate Type:</Text>
            <Text>{userDetails.graduateType || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Medical Degree:</Text>
            <Text>{userDetails.medicalDegree || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>IMG Type:</Text>
            <Text>{userDetails.img || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Step 1 Score Pass:</Text>
            <Text>{userDetails.step1ScorePass ? "Yes" : "No"}</Text>
          </Group>

          <Group>
            <Text w={500}>Step 1 Score:</Text>
            <Text>{userDetails.step1Score || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Step 2 Score:</Text>
            <Text>{userDetails.step2Score || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Step 3 Score:</Text>
            <Text>{userDetails.step3Score || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>COMLEX 1 Score Pass:</Text>
            <Text>{userDetails.comlex1ScorePass ? "Yes" : "No"}</Text>
          </Group>

          <Group>
            <Text w={500}>COMLEX 2 Score:</Text>
            <Text>{userDetails.comlex2Score || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Red Flags:</Text>
            <Text>{userDetails.redFlags ? "Yes" : "No"}</Text>
          </Group>

          <Group>
            <Text w={500}>Red Flags Explanation:</Text>
            <Text>{userDetails.redFlagsExplanation || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>AOA:</Text>
            <Text>{userDetails.aoa ? "Yes" : "No"}</Text>
          </Group>

          <Group>
            <Text w={500}>Sigma Sigma Phi:</Text>
            <Text>{userDetails.sigmaSigmaPhi ? "Yes" : "No"}</Text>
          </Group>

          <Group>
            <Text w={500}>Gold Humanism:</Text>
            <Text>{userDetails.goldHumanism ? "Yes" : "No"}</Text>
          </Group>

          <Group>
            <Text w={500}>Number of Publications:</Text>
            <Text>{userDetails.numPublications || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Number of Work Experiences:</Text>
            <Text>{userDetails.numWorkExperiences || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Number of Volunteer Experiences:</Text>
            <Text>{userDetails.numVolunteerExperiences || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Class Rank:</Text>
            <Text>{userDetails.classRank || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Other Degrees:</Text>
            <Text>{userDetails.otherDegrees || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Number of Applications:</Text>
            <Text>{userDetails.numApplications || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Number of Interviews:</Text>
            <Text>{userDetails.numInterviews || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Number of Withdrawn Applications:</Text>
            <Text>{userDetails.numWithdrawn || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Number of Rejections:</Text>
            <Text>{userDetails.numRejected || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Number of Waitlists:</Text>
            <Text>{userDetails.numWaitlisted || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Application Year:</Text>
            <Text>{userDetails.applicationYear || "N/A"}</Text>
          </Group>

          <Group>
            <Text w={500}>Public Profile:</Text>
            <Text>{userDetails.public ? "Yes" : "No"}</Text>
          </Group>
        </div>
      ) : (
        <div>This user's profile is not public.</div>
      )}
    </div>
  );
}
