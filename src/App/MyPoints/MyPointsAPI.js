// const baseUrl = 'http://localhost:3001'

const db = {
    semesters: [
        { ID: '大一上', order: 0, name: '2018-2019 学年第 1 学期' },
        { ID: '大一下', order: 1, name: '2018-2019 学年第 2 学期' },
        { ID: '德强上', order: 2, name: '2019-2020 学年第 1 学期' },
        { ID: '德强下', order: 3, name: '2019-2020 学年第 2 学期' },
        { ID: '大二上', order: 4, name: '2020-2021 学年第 1 学期' }
    ],
    grades: [
        { name: '优', points: 5 },
        { name: '良', points: 4 },
        { name: '中', points: 3 },
        { name: '及格', points: 2 },
        { name: '不及格', points: 0 },
        { name: '缓考', points: 0 }
    ],
    classes: [
        { semester: '大一上', grades: '优', credits: 0.5, name: '物理实验（上）' },
        { semester: '大一上', grades: '优', credits: 3, name: '思想道德修养与法律基础' },
        { semester: '大一上', grades: '中', credits: 1, name: '军事理论' },
        { semester: '大一上', grades: '优', credits: 1, name: '体育(1)' },
        { semester: '大一上', grades: '良', credits: 2, name: '工程实践' },
        { semester: '大一上', grades: '中', credits: 5, name: '高等数学(B)上' },
        { semester: '大一上', grades: '优', credits: 2, name: '国际交流英语视听说1' },
        { semester: '大一上', grades: '优', credits: 2, name: '大学英语五级' },
        { semester: '大一上', grades: '优', credits: 4, name: '日语二外(上)' },
        { semester: '大一上', grades: '良', credits: 2.5, name: 'C/C++程序设计' },
        { semester: '大一上', grades: '优', credits: 1, name: '新生教授研讨课（教授讲坛）' },
        { semester: '大一上', grades: '优', credits: 3, name: '机械制图(三)' },
        { semester: '大一上', grades: '优', credits: 0.5, name: '形势与政策(1)' },
        { semester: '大一下', grades: '优', credits: 0.5, name: '形势与政策(2)' },
        { semester: '大一下', grades: '优', credits: 2, name: '素描与写生' },
        { semester: '大一下', grades: '优', credits: 1, name: '电工实习' },
        { semester: '大一下', grades: '中', credits: 4, name: '电路理论' },
        { semester: '大一下', grades: '中', credits: 5, name: '高等数学(B)下' },
        { semester: '大一下', grades: '良', credits: 3, name: '线性代数B' },
        { semester: '大一下', grades: '中', credits: 3, name: '普通物理(B)上' },
        { semester: '大一下', grades: '优', credits: 1, name: '体育(2)' },
        { semester: '大一下', grades: '良', credits: 1.5, name: '科技文献检索与利用' },
        { semester: '大一下', grades: '中', credits: 3, name: '中国近现代史纲要' },
        { semester: '大一下', grades: '良', credits: 1, name: '物理实验（下）' },
        { semester: '德强上', grades: '良', credits: 2, name: '雕塑' },
        { semester: '德强上', grades: '良', credits: 1.5, name: '中国音乐与歌曲入门（中外）' },
        { semester: '德强上', grades: '良', credits: 18, name: '德语1' },
        { semester: '德强下', grades: '良', credits: 18, name: '德语2' },
        { semester: '德强下', grades: '优', credits: 2, name: '军训' },
        { semester: '大二上', grades: '优', credits: 1.5, name: '机器人与人工智能前沿' },
        { semester: '大二上', grades: '良', credits: 1, name: '电路实验' },
        { semester: '大二上', grades: '优', credits: 2, name: '英语笔译' },
        { semester: '大二上', grades: '优', credits: 5, name: '毛泽东思想和中国特色社会主义理论体系概论' },
        { semester: '大二上', grades: '优', credits: 0.5, name: '形势与政策(3)' },
        { semester: '大二上', grades: '良', credits: 2, name: '数据结构' },
        { semester: '大二上', grades: '优', credits: 2, name: '专业导论（信息类）' },
        { semester: '大二上', grades: '缓考', credits: 3, name: '概率论与数理统计' },
        { semester: '大二上', grades: '缓考', credits: 3, name: '普通物理(B)下' },
        { semester: '大二上', grades: '缓考', credits: 3, name: '复变函数与积分变换' },
        { semester: '大二上', grades: '缓考', credits: 3, name: '模拟电子技术' }
    ]
}

/**
 * @param {{
 *  semesters: { ID: string, order: number, name: string } [],
 *  classes: { semester: string, grades: string, credits: number, name: string } [],
 *  grades: { name: string, points: number } []
 * }} db 
 */
const toViewData = db => db.semesters.map(semester => ({
    title: semester.name,
    classes: db.classes.filter(classItem => classItem.semester === semester.ID).map(classItem => ({
        name: classItem.name,
        credits: classItem.credits,
        grades: classItem.grades,
        points: db.grades.filter(gradesItem => gradesItem.name === classItem.grades)[0].points,
        checked: false
    }))
}))

const MyPointsAPI = {
    // fetchDB: () => fetch(`${baseUrl}/fetchDB`).then(response => response.json())
    fetchDB: () => (new Promise((resove) => resove(db)))
}

export default MyPointsAPI