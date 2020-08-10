<template>
	<div id="newleadboards" v-if="tableData.length > 0">
		<SectionTitle :title="'Latest Leadboards'" :routePath="'/leadboards'">
			<i class="iconfont icon-paihangbang1"></i>
		</SectionTitle>
		<table class="el-table">
			<thead>
				<th v-for="item in leadboards" :key="item.id">{{ item.name }}</th>
			</thead>
			<tbody>
				<tr v-for="(rowData, rowIdx) in tableData" :key="rowIdx">
					<td v-for="(track, colIdx) in rowData" :key="colIdx">
						<div class="playlist">
							<span class="no">{{ rowIdx + 1 }}</span>
							<div class="item-wrapper">
								<span class="name">{{ track.name }}</span>
								<div class="buttons">
									<i class="iconfont icon-bofang1" @click="playAudio(track)"></i>
									<i class="iconfont icon-add1"></i>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr v-if="tableData.length > 0">
					<td class="viewAll">
						<el-button size="small">View Full List</el-button>
					</td>
					<td class="viewAll">
						<el-button size="small">View Full List</el-button>
					</td>
					<td class="viewAll">
						<el-button size="small">View Full List</el-button>
					</td>
					<td class="viewAll">
						<el-button size="small">View Full List</el-button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import SectionTitle from "@/components/pure-com/SectionTitle";
import { getLeadboardDetail, getAudioUrl, getAudioDetail } from "@/network/request";

export default {
	data() {
		return {
			leadboards: [],
			tableData: [],
		};
	},

	components: {
		SectionTitle,
	},

	methods: {
		async playAudio(track) {
			try {
				let res = await Promise.all([
					Promise.resolve(getAudioUrl(track.id)),
					Promise.resolve(getAudioDetail(track.id)),
				]);

				const audioUrl = res[0].data.data[0].url;
				const { picUrl } = res[1].data.songs[0].al; //album pic
				const { name, artist } = track;
				if (!audioUrl) {
					return this.$message({
						showClose: true,
						message: "Sorry, this track is only available to VIP user！",
						type: "error",
						offset: 50,
					});
				} else {
					this.$store.state.song = {
						name,
						artist,
						audioUrl,
						picUrl,
					};
				}
			} catch (error) {
				console.log(error);
			}
		},
	},

	// leadboards ids: 60198, 180106, 11641012, 120001
	async created() {
		let timestamp = Date.now();
		let data = await Promise.all([
			Promise.resolve(getLeadboardDetail({ id: 60198, limit: 20, timestamp })),
			Promise.resolve(getLeadboardDetail({ id: 180106, limit: 20, timestamp })),
			Promise.resolve(getLeadboardDetail({ id: 11641012, limit: 20, timestamp })),
			Promise.resolve(getLeadboardDetail({ id: 120001, limit: 20, timestamp })),
		]);

		data = data.map((data) => {
			let { id, name, desc, coverImgUrl, trackIds, tracks, playCount } = data.data.playlist;
			return { id, name, desc, coverImgUrl, trackIds, tracks, playCount };
		});

		this.leadboards = data;

		for (let i = 0; i < 20; i++) {
			this.tableData.push([
				{
					name: data[0].tracks[i].name,
					artist: data[0].tracks[i].al.name,
					id: data[0].trackIds[i].id,
				},
				{
					name: data[1].tracks[i].name,
					artist: data[1].tracks[i].al.name,
					id: data[1].trackIds[i].id,
				},
				{
					name: data[2].tracks[i].name,
					artist: data[2].tracks[i].al.name,
					id: data[2].trackIds[i].id,
				},
				{
					name: data[3].tracks[i].name,
					artist: data[3].tracks[i].al.name,
					id: data[3].trackIds[i].id,
				},
			]);
		}

		this.leadboards[0].name = "Billboard(Weekly)";
		this.leadboards[1].name = "UK Charts(Weekly)";
		this.leadboards[2].name = "iTunes(Weekly)";
		this.leadboards[3].name = "Hit FM Top(Weekly)";
	},
};
</script>

<style lang="scss">
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

#newleadboards {
	.playlist {
		display: flex;
		span.no {
			align-self: center;
			justify-self: end;
			width: 20px;
			margin-right: 10px;
			text-align: right;
			vertical-align: middle;
		}

		.item-wrapper {
			flex: 1;
			@include flex-align(row, space-between, center);
			// .buttons {
			//   visibility: hidden;
			// }

			&:hover {
				cursor: pointer;
				.name {
					text-decoration: underline;
				}
			}

			.buttons {
				i {
					padding: 0 5px;
					&:nth-child(1) {
						color: $theme-primary-color;
					}
				}
			}
		}
	}

	.el-table th {
		text-align: center;
		background-color: #f4f4f4;
		color: black;
	}

	.el-table td {
		padding-left: 10px;
		padding-right: 10px;
		width: 25%;
	}

	// the first 3 songs are in dark red
	tbody tr:nth-child(-n + 3) .no {
		color: rgb(196, 16, 16);
	}

	table {
		margin-top: 20px;
		margin-bottom: 20px;
		border: 1px solid #0094ff;
	}

	table th,
	table td {
		border-left: 1px solid #0094ff;
		border-right: 1px solid #0094ff;
	}

	table tr:last-child td {
		border-bottom: 1px solid #0094ff;
		text-align: center;
	}

	table th {
		font-weight: bold;
		background-color: #f4f4f4;
	}

	table tr:nth-child(even) {
		background-color: #f4f4f4;
	}

	table tr:nth-child(odd) {
		background-color: #e8e8e8;
	}
}
</style>
