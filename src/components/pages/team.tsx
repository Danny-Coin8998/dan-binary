"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import Team from "@/images/icons/team.png";
import { useTeam } from "@/store/team";

export default function TeamPage() {
  const { teamData, loading, error, fetchTeamData } = useTeam();

  useEffect(() => {
    fetchTeamData();
  }, [fetchTeamData]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  if (loading) {
    return (
      <>
        <div className="mb-4 md:mb-6">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
            My Team
            <Image
              src={Team}
              alt="Team"
              width={18}
              height={18}
              className="object-contain sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
            />
          </h1>
        </div>

        <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-[#1a1a1a] border-[#333]">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="mb-4 md:mb-6">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
            My Team
            <Image
              src={Team}
              alt="Team"
              width={18}
              height={18}
              className="object-contain sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
            />
          </h1>
        </div>

        <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardContent className="pt-6">
            <div className="text-center text-red-400">
              <p>Error loading team data: {error}</p>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  if (!teamData) {
    return (
      <>
        <div className="mb-4 md:mb-6">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
            My Team
            <Image
              src={Team}
              alt="Team"
              width={18}
              height={18}
              className="object-contain sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
            />
          </h1>
        </div>

        <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardContent className="pt-6">
            <div className="text-center text-gray-400">
              <p>No team data available</p>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="mb-4 md:mb-6">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
          My Team
          <Image
            src={Team}
            alt="Team"
            width={18}
            height={18}
            className="object-contain sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
          />
        </h1>
      </div>

      <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

      <div className="space-y-6">
        {/* User Info Card */}
        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Your Information</span>
              <Badge variant="secondary" className="bg-green-600 text-white">
                ID: {teamData.user.userid}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-white font-medium">
                  {teamData.user.firstname}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Referral Code</p>
                <p className="text-white font-medium font-mono">
                  {teamData.user.ref_code}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Self PV</p>
                <p className="text-white font-medium">
                  {formatNumber(teamData.user.s_pv)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Left PV</p>
                <p className="text-white font-medium">
                  {formatNumber(teamData.user.l_pv)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Right PV</p>
                <p className="text-white font-medium">
                  {formatNumber(teamData.user.r_pv)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Referrals</p>
                <p className="text-white font-medium">
                  {teamData.total_referrals}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sponsor & Upline Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader>
              <CardTitle className="text-white">Sponsor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white font-medium">
                    {teamData.sponsor.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">User ID</p>
                  <p className="text-white font-medium">
                    {teamData.sponsor.userid}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader>
              <CardTitle className="text-white">Upline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white font-medium">
                    {teamData.upline.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">User ID</p>
                  <p className="text-white font-medium">
                    {teamData.upline.userid}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Team */}
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Left Team</span>
                <Badge
                  variant="outline"
                  className="border-blue-500 text-blue-400"
                >
                  {teamData.children.left.length} members
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {teamData.children.left.length > 0 ? (
                <div className="space-y-3">
                  {teamData.children.left.map((member) => (
                    <div
                      key={member.userid}
                      className="p-3 bg-[#2a2a2a] rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-medium">
                          {member.firstname}
                        </p>
                        <Badge
                          variant="secondary"
                          className="bg-blue-600 text-white text-xs"
                        >
                          ID: {member.userid}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-400">Self PV</p>
                          <p className="text-white">
                            {formatNumber(member.s_pv)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Left PV</p>
                          <p className="text-white">
                            {formatNumber(member.l_pv)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Right PV</p>
                          <p className="text-white">
                            {formatNumber(member.r_pv)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No left team members
                </p>
              )}
            </CardContent>
          </Card>

          {/* Right Team */}
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Right Team</span>
                <Badge
                  variant="outline"
                  className="border-green-500 text-green-400"
                >
                  {teamData.children.right.length} members
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {teamData.children.right.length > 0 ? (
                <div className="space-y-3">
                  {teamData.children.right.map((member) => (
                    <div
                      key={member.userid}
                      className="p-3 bg-[#2a2a2a] rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-medium">
                          {member.firstname}
                        </p>
                        <Badge
                          variant="secondary"
                          className="bg-green-600 text-white text-xs"
                        >
                          ID: {member.userid}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-400">Self PV</p>
                          <p className="text-white">
                            {formatNumber(member.s_pv)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Left PV</p>
                          <p className="text-white">
                            {formatNumber(member.l_pv)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Right PV</p>
                          <p className="text-white">
                            {formatNumber(member.r_pv)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No right team members
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
