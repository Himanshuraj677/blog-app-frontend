"use client";

import React, { useEffect, useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useParams } from "next/navigation";
import { useService } from "@/hooks/useService";
import { API_SERVICES } from "@/lib/constant";
import { toast } from "react-toastify";
import { handleImageUpload } from "@/utils/handleImageUpload";

// ✅ Types
interface ProfileData {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  profile?: {
    bio?: string;
    website?: string;
    social?: Record<string, string>;
  } | null;
}

interface PayloadType {
  name: string;
  image: string;
  bio: string;
  website: string;
  social: Record<string, any>;
}

interface ApiResponse<T> extends Record<string, any> {
  success: boolean;
  message: string;
  error: string | null;
  data: T | null;
}

export default function ProfilePage() {
  const params = useParams();
  const profileId = params?.id as string;

  // ✅ Fetch profile
  const {
    loading,
    data: fetched,
    execute: fetchProfile,
  } = useService<ApiResponse<ProfileData>>(`${API_SERVICES.profile}/${profileId}`);

  // ✅ Update profile
  const {
    loading: updating,
    data: updated,
    error: updateError,
    execute: updateProfile,
  } = useService<ApiResponse<ProfileData>, PayloadType>(`${API_SERVICES.profile}/${profileId}`);

  const { data: session, isPending } = authClient.useSession();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");

  // ✅ Image upload states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const uploadAbortController = useRef<AbortController | null>(null);

  const isOwner = session?.user?.id === profile?.id;

  useEffect(() => {
    if (profileId) fetchProfile();
  }, [profileId]);

  useEffect(() => {
    const source = fetched?.data;
    if (source) {
      setProfile({
        ...source,
        profile: source.profile || { bio: "", website: "", social: {} },
      });
    }
  }, [fetched]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError.message || "Unable to update");
    }
  }, [updateError]);

  // ✅ Save profile
  const handleSave = async () => {
    if (!profile) return;

    await updateProfile({
      method: "PUT",
      body: {
        name: profile.name,
        image: profile.image || "",
        bio: profile.profile?.bio || "",
        website: profile.profile?.website || "",
        social: profile.profile?.social || {},
      },
    });
    setEditMode(false);
  };

  // ✅ Image upload handler
  const handleProfileImageUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);

    uploadAbortController.current = new AbortController();

    try {
      const url = await handleImageUpload(
        file,
        ({ progress }) => setUploadProgress(progress),
        uploadAbortController.current.signal
      );
      setProfile({ ...profile!, image: url });
    } catch (err: any) {
      if (err.name === "AbortError") {
        toast.info("Upload cancelled");
      } else {
        toast.error(err.message || "Upload failed");
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (loading || isPending)
    return (
      <p className="text-center mt-20 animate-pulse text-gray-400 text-lg">
        Loading...
      </p>
    );

  if (!profile)
    return (
      <p className="text-center text-gray-400 mt-20 text-lg">
        Profile not found.
      </p>
    );

  return (
    <div className="w-full">
      <div className="container min-h-screen text-white px-6 py-10 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-800 pb-6 sm:justify-center">
          <Avatar className="w-16 h-16 ring-4 ring-blue-600">
            <AvatarImage src={profile.image || ""} />
            <AvatarFallback className="text-2xl">
              {profile.name ? profile.name[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 flex flex-col gap-2 sm:gap-1 sm:justify-center sm:text-left w-full">
            {editMode ? (
              <>
                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="bg-gray-800 text-white border-gray-700 rounded-lg text-xl font-semibold"
                />

                {/* ✅ Image Upload Section */}
                <div className="mt-2 flex flex-col sm:flex-row items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0])
                        handleProfileImageUpload(e.target.files[0]);
                    }}
                    className="bg-gray-800 text-white border-gray-700 rounded-lg"
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="flex-1 w-full sm:w-auto mt-2 sm:mt-0">
                      <div className="w-full bg-gray-700 h-3 rounded overflow-hidden">
                        <div
                          className="h-3 bg-blue-500 transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">
                        {uploadProgress}%
                      </p>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="mt-1"
                        onClick={() => uploadAbortController.current?.abort()}
                      >
                        Cancel Upload
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <h1 className="text-3xl font-bold text-center sm:text-left">
                {profile.name}
              </h1>
            )}
          </div>

          {/* Edit / Save */}
          {isOwner && (
            <div className="mt-4 sm:mt-0 sm:ml-auto">
              {editMode ? (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700 mr-2"
                    onClick={handleSave}
                    disabled={updating || isUploading}
                  >
                    {updating ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setEditMode(false);
                      if (fetched?.data) {
                        setProfile({
                          ...fetched.data,
                          profile: fetched.data.profile || {
                            bio: "",
                            website: "",
                            social: {},
                          },
                        });
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="mt-10 space-y-6">
          {/* Bio */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Label htmlFor="bio" className="text-gray-300 font-medium">
              Bio
            </Label>
            {editMode ? (
              <Textarea
                id="bio"
                placeholder="Tell something about yourself"
                value={profile.profile?.bio || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    profile: { ...profile.profile!, bio: e.target.value },
                  })
                }
                className="bg-gray-900 text-white border-gray-700 rounded-lg mt-2"
              />
            ) : (
              <p className="text-gray-400 mt-2">
                {profile.profile?.bio || "No bio provided."}
              </p>
            )}
          </div>

          {/* Website */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Label htmlFor="website" className="text-gray-300 font-medium">
              Website
            </Label>
            {editMode ? (
              <Input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com"
                value={profile.profile?.website || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    profile: { ...profile.profile!, website: e.target.value },
                  })
                }
                className="bg-gray-900 text-white border-gray-700 rounded-lg mt-2"
              />
            ) : profile.profile?.website ? (
              <a
                href={profile.profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                {profile.profile.website}
              </a>
            ) : (
              <p className="text-gray-400 mt-2">No website provided.</p>
            )}
          </div>

          {/* Social Links */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Label className="text-gray-300 font-medium">Social Links</Label>
            <div className="mt-2 space-y-2">
              {profile.profile?.social &&
                Object.entries(profile.profile.social).map(([key, value]) =>
                  editMode ? (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row gap-2 items-center"
                    >
                      <Input
                        value={key}
                        readOnly
                        className="bg-gray-900 text-white border-gray-700 w-full sm:w-36 rounded-lg"
                      />
                      <Input
                        value={value}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            profile: {
                              ...profile.profile!,
                              social: {
                                ...profile.profile!.social,
                                [key]: e.target.value,
                              },
                            },
                          })
                        }
                        className="bg-gray-900 text-white border-gray-700 flex-1 rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-2 sm:mt-0"
                        onClick={() => {
                          const updated = { ...profile.profile!.social };
                          delete updated[key];
                          setProfile({
                            ...profile,
                            profile: { ...profile.profile!, social: updated },
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <a
                      key={key}
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline block"
                    >
                      {key}
                    </a>
                  )
                )}

              {editMode && (
                <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
                  <Input
                    placeholder="Platform (e.g. Twitter)"
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="bg-gray-900 text-white border-gray-700 w-full sm:w-36 rounded-lg"
                  />
                  <Input
                    placeholder="https://..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="bg-gray-900 text-white border-gray-700 flex-1 rounded-lg"
                  />
                  <Button
                    size="sm"
                    className="mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      if (!newPlatform || !newUrl) return;
                      setProfile({
                        ...profile,
                        profile: {
                          ...profile.profile!,
                          social: {
                            ...profile.profile!.social,
                            [newPlatform]: newUrl,
                          },
                        },
                      });
                      setNewPlatform("");
                      setNewUrl("");
                    }}
                  >
                    Add
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
