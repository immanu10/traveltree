export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bucketlists: {
        Row: {
          id: number;
          inserted_at: string;
          is_completed: boolean | null;
          is_liked: boolean | null;
          post_id: number;
          user_id: string;
          visited_month: Database["public"]["Enums"]["months_enum"] | null;
          visited_year: number | null;
        };
        Insert: {
          id?: never;
          inserted_at?: string;
          is_completed?: boolean | null;
          is_liked?: boolean | null;
          post_id: number;
          user_id: string;
          visited_month?: Database["public"]["Enums"]["months_enum"] | null;
          visited_year?: number | null;
        };
        Update: {
          id?: never;
          inserted_at?: string;
          is_completed?: boolean | null;
          is_liked?: boolean | null;
          post_id?: number;
          user_id?: string;
          visited_month?: Database["public"]["Enums"]["months_enum"] | null;
          visited_year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "bucketlists_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bucketlists_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      posts: {
        Row: {
          best_months: Database["public"]["Enums"]["months_enum"][] | null;
          country: string | null;
          description: string | null;
          id: number;
          inserted_at: string;
          map_url: string | null;
          state: string | null;
          title: string | null;
          user_id: string;
        };
        Insert: {
          best_months?: Database["public"]["Enums"]["months_enum"][] | null;
          country?: string | null;
          description?: string | null;
          id?: never;
          inserted_at?: string;
          map_url?: string | null;
          state?: string | null;
          title?: string | null;
          user_id: string;
        };
        Update: {
          best_months?: Database["public"]["Enums"]["months_enum"][] | null;
          country?: string | null;
          description?: string | null;
          id?: never;
          inserted_at?: string;
          map_url?: string | null;
          state?: string | null;
          title?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          full_name: string | null;
          id: string;
          inserted_at: string;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          full_name?: string | null;
          id: string;
          inserted_at?: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          full_name?: string | null;
          id?: string;
          inserted_at?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_posts_info: {
        Args: {
          current_user_id: string | null;
        };
        Returns: {
          id: number;
          user_id: string;
          username: string;
          full_name: string;
          title: string;
          description: string;
          map_url: string;
          best_months: Database["public"]["Enums"]["months_enum"][];
          state: string;
          country: string;
          inserted_at: string;
          total_likes: number;
          liked_by_current_user: boolean;
        }[];
      };
    };
    Enums: {
      months_enum:
        | "Jan"
        | "Feb"
        | "Mar"
        | "Apr"
        | "May"
        | "Jun"
        | "Jul"
        | "Aug"
        | "Sep"
        | "Oct"
        | "Nov"
        | "Dec";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
